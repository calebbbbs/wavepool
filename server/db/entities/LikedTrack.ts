/* eslint-disable camelcase */
import { Entity, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import User from './User';
import Track from './Track';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export default class LikedTrack extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  @OneToOne(() => User)
  @JoinColumn()
  user_id: number;

  @Field(() => [Track])
  @ManyToOne(() => Track, track => track, {cascade:true})
  tracks: Track;
}
