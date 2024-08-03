import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/entities/group.entity';
import { Repository } from 'typeorm';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { User } from 'src/entities/user.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find({ relations: { users: true } });
  }

  async findOne(id: number): Promise<Group> {
    return this.groupRepository.findOne({
      where: { id },
      relations: {
        users: true,
      },
    });
  }

  async create(createGroupInput: CreateGroupInput): Promise<Group> {
    const { userIds, ...groupData } = createGroupInput;
    const users = (userIds || []).map((id) => {
      const user = new User();
      user.id = id;
      return user;
    });
    return this.groupRepository.save({
      ...groupData,
      users,
      created_at: new Date(),
    });
  }

  async update(updateGroupInput: UpdateGroupInput): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: updateGroupInput.id },
    });
    if (!group) {
      throw new NotFoundException(
        `Group with ID ${updateGroupInput.id} not found`,
      );
    }
    const updatedGroup = {
      ...group,
      ...updateGroupInput,
      updated_at: new Date(),
    };
    return this.groupRepository.save(updatedGroup);
  }

  async remove(id: number): Promise<{ message: string; status: number }> {
    const group = await this.findOne(id);
    if (!group) return { message: `${id} not found`, status: 404 };
    await this.groupRepository.remove(group);
    return { message: `${id} deleted`, status: 200 };
  }
}
