/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field } from "type-graphql";
import User from './User';


@Entity()
@ObjectType()
export default class Friend extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  user_id: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.friends, {cascade:true})
  user!: Promise<User | undefined>;

  @Field(() => String)
  @Column()
  friend_id: string;

  @Field(() => String)
  @Column()
  friend_name: string;

  @Field(() => Boolean)
  @Column()
  friend_status: boolean;

  @Field(() => Number)
  @Column()
  friend_score: number;

  @Field(() => Number)
  @Column()
  number_of_songs: number;
}