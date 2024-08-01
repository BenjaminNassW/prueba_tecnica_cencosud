import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';
import { Group } from '../entities/group.entity';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Comment, Post, Group])],
  providers: [ProfileService, ProfileResolver],
  controllers: [],
})
export class ProfileModule {}
