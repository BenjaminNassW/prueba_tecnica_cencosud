import { Module } from '@nestjs/common';
import { UserService } from './user.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserResolver } from './user.resolver';
import { Profile } from '../entities/profile.entity';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';
import { Group } from '../entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Comment, Post, Group])],
  providers: [UserService, UserResolver],
  controllers: [],
})
export class UserModule {}
