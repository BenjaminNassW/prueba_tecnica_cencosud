import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Profile[]> {
    return this.profileRepository.find({ relations: { user: true } });
  }

  findOne(id: number): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async createProfile(
    createProfileInput: CreateProfileInput,
  ): Promise<Profile | { status: number; message: string }> {
    const user = await this.userRepository.findOneBy({
      id: createProfileInput.userId,
    });

    if (!user)
      return {
        status: 404,
        message: `User ID: ${createProfileInput.userId} not found.`,
      };

    return await this.profileRepository.save({
      user,
      biography: createProfileInput.biography,
      dateOfBirth: createProfileInput.dateOfBirth,
      created_at: new Date(),
    });
  }

  async updateProfile(
    updateProfileInput: UpdateProfileInput,
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id: updateProfileInput.id },
    });
    if (!profile) {
      throw new NotFoundException(
        `User with ID ${updateProfileInput.id} not found`,
      );
    }
    const updatedProfile = {
      ...profile,
      ...updateProfileInput,
      updated_at: new Date(),
    };
    await this.profileRepository.save(updatedProfile);
    return updatedProfile;
  }

  async remove(id: number): Promise<{ message: string; status: number }> {
    const deletedRow = await this.profileRepository.delete(id);
    if (deletedRow.affected > 0)
      return { message: `profile with ID: ${id} deleted`, status: 200 };
    return { message: `profile with ID: ${id} not found`, status: 404 };
  }
}
