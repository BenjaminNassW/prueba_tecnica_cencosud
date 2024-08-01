import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCommentInput {
  @Field(() => Int)
  postId: number;

  @Field()
  content: string;
}
