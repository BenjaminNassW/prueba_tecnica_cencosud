import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Int])
  userIds?: number[];
}
