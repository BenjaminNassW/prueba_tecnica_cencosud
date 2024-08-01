import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'group' })
export class Group {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  created_at: Date;

  @ManyToMany(() => User)
  @JoinTable({ name: 'user_group' })
  users: User[];

  @Field()
  @Column({ nullable: true })
  updated_at?: Date;
}
