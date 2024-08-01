import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'profile' })
export class Profile {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field()
  @Column()
  biography: string;

  @Field()
  @Column()
  dateOfBirth: Date;

  @Field()
  @Column()
  created_at: Date;

  @Field()
  @Column({ nullable: true })
  updated_at?: Date;
}
