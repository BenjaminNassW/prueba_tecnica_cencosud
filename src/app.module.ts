import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Profile } from './entities/profile.entity';
import { Group } from './entities/group.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { GroupModule } from './group/group.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydatabase',
      entities: [User, Profile, Post, Comment, Group],
      synchronize: false,
    }),
    UserModule,
    ProfileModule,
    PostModule,
    GroupModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
