import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCommentInput {
  @Field(() => Int)
  postId: number;

  @Field(() => Int)
  commentId: number;

  @Field()
  content: string;
}
