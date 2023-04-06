import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Profile } from './users/profile.entity';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nestdb',
      entities: [User, Profile, Post],
      synchronize: true
    }),
    UsersModule,
    PostsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
