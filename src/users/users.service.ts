import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Profile } from './profile.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { CreateProfileDto } from './dto/profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>
  ) {}

  async getUsers() {
    try {
      const users = await this.usersRepository.find({ relations: ['profile'] });
      return {
        message: 'Get users successfully',
        users
      };
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(user: CreateUserDto) {
    try {
      const userFinded = await this.usersRepository.findOneBy({ username: user.username });
      if (userFinded) {
        return new HttpException('User already exists', HttpStatus.CONFLICT);
      }
      const newUser = this.usersRepository.create(user);
      const createdUser = await this.usersRepository.save(newUser);
      return {
        message: 'User created successfully',
        user: createdUser
      };
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUser(id: string) {
    try {
      const userFinded = await this.usersRepository.findOne({ where: { id }, relations: ['profile', 'posts'] });
      if (!userFinded) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Get user successfully',
        user: userFinded
      };
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: string, user: UpdateUserDto) {
    try {
      const userFinded = await this.usersRepository.findOneBy({ id });
      if (!userFinded) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      await this.usersRepository.update({ id }, user);
      const updatedUser = await this.usersRepository.findOneBy({ id });
      return {
        message: 'Update user successfully',
        user: updatedUser
      };
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: string) {
    try {
      const result = await this.usersRepository.delete(id);
      if (result.affected === 0) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: `Deleted user ${id} successfully`
      };
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createProfile(id: string, profile: CreateProfileDto) {
    console.log(id, JSON.stringify(profile, null, 2));
    try {
      const userFinded = await this.usersRepository.findOneBy({ id });
      if (!userFinded) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const newProfile = this.profilesRepository.create(profile);
      const createdProfile = await this.profilesRepository.save(newProfile);

      userFinded.profile = createdProfile;
      const userUpdated = await this.usersRepository.save(userFinded);
      return {
        message: 'User Profile created successfully',
        user: userUpdated
      };
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
