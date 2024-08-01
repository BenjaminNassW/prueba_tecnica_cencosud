import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from 'src/entities/profile.entity';
import { UpdateProfileInput } from './dto/update-profile.input';
import { CreateProfileInput } from './dto/create-profile.input';
import { DeleteGQL } from 'src/shared/gql/delete.gql';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => [Profile])
  findAllProfiles(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Query(() => Profile, { nullable: true })
  findOneProfile(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Profile> {
    return this.profileService.findOne(id);
  }

  @Mutation(() => Profile)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ): Promise<Profile | { status: number; message: string }> {
    return this.profileService.createProfile(createProfileInput);
  }

  @Mutation(() => Profile)
  updateProfile(
    @Args('updateProfileInput') updateUserInput: UpdateProfileInput,
  ): Promise<Profile> {
    return this.profileService.updateProfile(updateUserInput);
  }

  @Mutation(() => DeleteGQL)
  removeProfile(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<{ message: string; status: number }> {
    return this.profileService.remove(id);
  }
}
