/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import User from './User';

@Entity()
@ObjectType()
export default class RecommendedTrack extends BaseEntity {
  @PrimaryColumn()
  @Field(() => ID)
  user_id: number;

  @Field(() => String)
  @Column()
  track_id: string;

  @Field(() => String)
  @Column()
  friend_id: string;

  @Field(() => String)
  @Column()
   spotify_uri: string;
 
  @Field(() => [])
  @Column()
  artists: [];
 
  @Field(() => String)
  @Column()
  album_id: string;
 
  @Field(() => String)
  @Column()
  album_uri: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.recommendedTracks, {cascade:true})
  user!: Promise<User | undefined>;
}