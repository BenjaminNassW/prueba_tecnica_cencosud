import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from './post.entity';
import { Profile } from './profile.entity';

@ObjectType()
@Entity({ name: 'user' })
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field(() => Profile, { nullable: true })
  @OneToOne(() => Profile, (profile) => profile.user)
  profile?: Profile;

  @Field(() => Post, { nullable: true })
  @OneToMany(() => Post, (post) => post.user)
  post: Post[];

  @Field()
  @Column()
  created_at: Date;

  @Field()
  @Column({ nullable: true })
  updated_at?: Date;
}
