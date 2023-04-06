import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { CreateProfileDto } from './dto/profile.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return await this.usersService.createUser(user);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return await this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }

  @Post(':id/profile')
  async createProfile(@Param('id') id: string, @Body() profile: CreateProfileDto) {
    return await this.usersService.createProfile(id, profile);
  }
}
