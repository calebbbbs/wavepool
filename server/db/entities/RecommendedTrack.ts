/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import User from './User';

@Entity()
@ObjectType()
export default class RecommendedTrack extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Field(() => ID)
  user_id: String;

  @Field(() => String)
  @Column()
  friend_id: string;

  @Field(() => String)
  @Column()
  friend_name: string;

  @Field(() => String)
  @Column()
  track_title: string;

  @Field(() => String)
  @Column()
  track_uri: string;
 
  @Field(() => [String])
  @Column("text", { array: true })
  artists: string[];
 
  @Field(() => String)
  @Column()
  album_title: string;

  @Field(() => String)
  @Column()
  album_art: string;

  @Field(() => String)
  @Column()
  album_uri: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.recommendedTracks, {cascade:true})
  user!: Promise<User | undefined>;

  @Field(() => Boolean)
  @Column()
  in_queue: boolean;

  @Field(() => String)
  @Column()
  comment_text: string;
}