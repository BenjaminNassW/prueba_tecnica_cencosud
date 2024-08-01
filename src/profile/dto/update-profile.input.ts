import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  biography?: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;
}
