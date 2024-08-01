import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DeleteGQL {
  @Field(() => Int)
  status: number;

  @Field()
  message: string;
}
