/* eslint-disable camelcase */
import { Field, ObjectType } from 'type-graphql';
import { Entity, PrimaryColumn, Column, ManyToOne, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import Track from './Track';
import User from './User';

@ObjectType()
@Entity()
export default class History extends BaseEntity {
  @Field(() => Number)
  @PrimaryColumn()
  @OneToOne(() => User)
  @JoinColumn()
  user_id: number;

  @Field(() => [Track])
  @ManyToOne(() => Track, (track: Track)=> track, {cascade:true})
  tracks: Promise<Track[]>;

  @Field(() => Date)
  @Column()
  created_at: Date;
}
