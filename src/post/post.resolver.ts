import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Post } from 'src/entities/post.entity';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { DeleteGQL } from 'src/shared/gql/delete.gql';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Query(() => Post, { nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Post> {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<Post> {
    return this.postService.create(createPostInput);
  }

  @Mutation(() => Post)
  updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    return this.postService.update(updatePostInput);
  }

  @Mutation(() => DeleteGQL)
  removePost(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<{ message: string; status: number }> {
    return this.postService.remove(id);
  }
}
