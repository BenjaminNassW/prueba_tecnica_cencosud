import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Group } from 'src/entities/group.entity';
import { GroupService } from './group.service';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { DeleteGQL } from 'src/shared/gql/delete.gql';

@Resolver()
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Query(() => [Group])
  findAllGroups(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @Query(() => Group, { nullable: true })
  findOneGroup(@Args('id', { type: () => Int }) id: number): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @Mutation(() => Group)
  createGroup(
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ): Promise<Group> {
    return this.groupService.create(createGroupInput);
  }

  @Mutation(() => Group)
  updateGroup(
    @Args('updateGroupInput') updateGroupInput: UpdateGroupInput,
  ): Promise<Group> {
    return this.groupService.update(updateGroupInput);
  }

  @Mutation(() => DeleteGQL)
  removeGroup(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<{ message: string; status: number }> {
    return this.groupService.remove(id);
  }
}
