import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from './dto/create-user.input/create-user.input';
import { DeleteUserGQL } from './gql/deleteUser.gql';
import { UpdateUserInput } from './dto/create-user.input/update-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => DeleteUserGQL)
  removeUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<{ message: string; status: number }> {
    return this.userService.remove(id);
  }
}
