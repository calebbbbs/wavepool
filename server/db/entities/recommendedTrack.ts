/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, BaseEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import User from './User';
import Track from './Track';

@Entity()
export default class RecommendedTrack extends BaseEntity {
  @PrimaryColumn()
  @OneToOne(() => User)
  @JoinColumn()
  user_id: number;

  @ManyToOne(() => Track, track => track, {cascade:true})
  track_id: Track;

  @Column()
  friend_id: number;
}