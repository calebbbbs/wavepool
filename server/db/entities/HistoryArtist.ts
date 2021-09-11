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

  @Field(() => String)
  @Column()
  user_id: string;

  @Field(() => String)
  @Column()
  artist_name: string;

  @Field(() => String)
  @Column()
  artist_uri: string;

  @Field(() => String)
  @Column()
  image_url: string;

  @Field(() => Number)
  @Column()
  count: number;
  
  @Field(() => Number)
  @Column()
  time_listened: number;
  
  @Field(() => Boolean)
  @Column()
  is_explicit: boolean;
  
  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.historyArtists, {cascade:true})
  user!: Promise<User | undefined>;
}