/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import User from './User';

@Entity()
@ObjectType()
export default class RecommendedTrack extends BaseEntity {
  @PrimaryColumn()
  @Field(() => ID)
  user_id: String;

  @Field(() => String)
  @Column()
  friend_id: string;

  @Field(() => String)
  @Column()
  track_title: string;

  @Field(() => String)
  @Column()
  spotify_uri: string;
 
  @Field(() => [String])
  @Column("text", { array: true })
  artists: string[];
 
  @Field(() => String)
  @Column()
  album_title: string;

  @Field(() => String)
  @Column()
  album_art: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.recommendedTracks, {cascade:true})
  user!: Promise<User | undefined>;
}