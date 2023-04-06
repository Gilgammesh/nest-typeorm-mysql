import { Controller, Post, Body, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getPosts() {
    return await this.postsService.getPosts();
  }

  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return await this.postsService.createPost(post);
  }
}
