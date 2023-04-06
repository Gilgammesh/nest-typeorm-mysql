import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getPosts() {
    try {
      const posts = await this.postsRepository.find({ relations: ['author'] });
      return {
        message: 'Get posts successfully',
        posts
      };
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createPost(post: CreatePostDto) {
    try {
      const userFinded = await this.usersRepository.findOneBy({ id: post.authorId });
      if (!userFinded) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const newPost = this.postsRepository.create({ ...post, author: userFinded });
      const createdPost = await this.postsRepository.save(newPost);
      return {
        message: 'Post created successfully',
        post: createdPost
      };
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
