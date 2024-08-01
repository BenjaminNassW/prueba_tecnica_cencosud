import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Post } from 'src/entities/post.entity';
import { Comment } from 'src/entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  findOne(id: number): Promise<Comment> {
    return this.commentRepository.findOneBy({ id });
  }

  async createComment(
    createCommentInput: CreateCommentInput,
  ): Promise<Comment | { status: number; message: string }> {
    const post = await this.postRepository.findOneBy({
      id: createCommentInput.postId,
    });

    if (!post)
      return {
        status: 404,
        message: `Post ID: ${createCommentInput.postId} not found.`,
      };

    await this.commentRepository.save({
      content: createCommentInput.content,
      post,
    });
  }

  async updateComment(
    updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    const post = await this.postRepository.findOne({
      where: { id: updateCommentInput.postId },
    });
    if (!post) {
      throw new NotFoundException(
        `User with ID ${updateCommentInput.postId} not found`,
      );
    }
    return await this.commentRepository.save({
      ...post,
      ...updateCommentInput,
      updated_at: new Date(),
    });
  }

  async remove(id: number): Promise<{ message: string; status: number }> {
    const deletedRow = await this.commentRepository.delete(id);
    if (deletedRow.affected > 0)
      return { message: `profile with ID: ${id} deleted`, status: 200 };
    return { message: `profile with ID: ${id} not found`, status: 404 };
  }
}
