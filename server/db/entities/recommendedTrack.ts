/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, BaseEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import User from './User';
import Track from './Track';

@Entity()
export default class RecommendedTrack extends BaseEntity {
  @PrimaryColumn()
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Track, track => track.liked, {cascade:true})
  track: Track;

  @Column()
  friend_id: number;
}