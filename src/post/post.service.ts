import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: { comments: true, user: true },
    });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: { id },
      relations: {
        comments: true,
        user: true,
      },
    });
  }

  async create(createPostInput: CreatePostInput): Promise<Post> {
    return this.postRepository.save({
      ...createPostInput,
      user: { id: createPostInput.userId } as User,
      created_at: new Date(),
    });
  }

  async update(updatePostInput: UpdatePostInput): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id: updatePostInput.id },
    });
    if (!post) {
      throw new NotFoundException(
        `Post with ID ${updatePostInput.id} not found`,
      );
    }
    const updatedPost = {
      ...post,
      ...updatePostInput,
      updated_at: new Date(),
    };
    return this.postRepository.save(updatedPost);
  }

  async remove(id: number): Promise<{ message: string; status: number }> {
    const group = await this.findOne(id);
    if (!group) return { message: `${id} not found`, status: 404 };
    await this.postRepository.remove(group);
    return { message: `${id} deleted`, status: 200 };
  }
}
