/* eslint-disable camelcase */
import { Entity, PrimaryColumn, OneToOne, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import User from './User';
import Track from './Track';

@Entity()
export default class LikedTrack extends BaseEntity {
  @PrimaryColumn()
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Track, track => track.liked)
  track: Track;
}
