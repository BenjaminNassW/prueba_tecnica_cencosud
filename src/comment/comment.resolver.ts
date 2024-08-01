import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DeleteGQL } from 'src/shared/gql/delete.gql';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from 'src/entities/comment.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment])
  findAllComments(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Query(() => Comment, { nullable: true })
  findOneComment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ): Promise<Comment | { status: number; message: string }> {
    return this.commentService.createComment(createCommentInput);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    return this.commentService.updateComment(updateCommentInput);
  }

  @Mutation(() => DeleteGQL)
  removeComment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<{ message: string; status: number }> {
    return this.commentService.remove(id);
  }
}
