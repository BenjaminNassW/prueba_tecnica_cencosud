import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field(() => Int)
  userId: number;

  @Field()
  biography: string;

  @Field()
  dateOfBirth: Date;
}
