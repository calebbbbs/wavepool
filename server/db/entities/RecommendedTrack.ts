/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, BaseEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import User from './User';
import Track from './Track';

@Entity()
@ObjectType()
export default class RecommendedTrack extends BaseEntity {
  @PrimaryColumn()
  @Field(() => ID)
  @OneToOne(() => User)
  @JoinColumn()
  user_id: number;

  @Field(() => Track)
  @ManyToOne(() => Track, track => track, {cascade:true})
  track_id: Track;

  @Field(() => Number)
  @Column()
  friend_id: number;
}