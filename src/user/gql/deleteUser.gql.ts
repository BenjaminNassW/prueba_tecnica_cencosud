import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DeleteUserGQL {
  @Field(() => Int)
  status: number;

  @Field()
  message: string;
}
