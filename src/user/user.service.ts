import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserInput } from './dto/create-user.input/create-user.input';
import { UpdateUserInput } from './dto/create-user.input/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create({
      ...createUserInput,
      created_at: new Date(),
    });
    return this.userRepository.save(user);
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: updateUserInput.id },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${updateUserInput.id} not found`,
      );
    }
    const updatedUser = { ...user, ...updateUserInput, updated_at: new Date() };
    await this.userRepository.save(updatedUser);
    return updatedUser;
  }

  async remove(id: number): Promise<{ message: string; status: number }> {
    const deletedRow = await this.userRepository.delete(id);
    if (deletedRow.affected > 0)
      return { message: `${id} deleted`, status: 200 };
    return { message: `${id} not found`, status: 404 };
  }
}
