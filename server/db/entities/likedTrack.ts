/* eslint-disable camelcase */
import { Entity, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import User from './User';
import Track from './Track';

@Entity()
export default class LikedTrack extends BaseEntity {
  @PrimaryColumn()
  @OneToOne(() => User)
  @JoinColumn()
  user_id: number;

  @ManyToOne(() => Track, track => track, {cascade:true})
  tracks: Track;
}
