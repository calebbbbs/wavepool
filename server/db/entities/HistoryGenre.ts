/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import User from './User';

@Entity()
@ObjectType()
export default class HistoryGenre extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  user_id: string;

  @Column()
  @Field(() => String)
  genre: string;

  @Column()
  @Field(() => Number)
  count: number;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.historyGenres, {cascade:true})
  user!: Promise<User | undefined>;
}