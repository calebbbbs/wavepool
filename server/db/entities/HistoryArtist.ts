/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import User from './User';

@Entity()
@ObjectType()
export default class HistoryArtist extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Field(() => String)
  user_id: string;

  @Column()
  @Field(() => String)
  artist_name: string;

  @Column()
  @Field(() => String)
  artist_uri: string;

  @Column()
  @Field(() => Number)
  count: number;

  @Column()
  @Field(() => Number)
  time_listened: number;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.historyArtists, {cascade:true})
  user!: Promise<User | undefined>;
}