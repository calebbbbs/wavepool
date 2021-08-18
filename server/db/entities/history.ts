/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, ManyToOne, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import Track from './Track';
import User from './User';

@Entity()
export default class History extends BaseEntity {
  @PrimaryColumn()
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Track, track => track.history)
  track: Track;

  @Column()
  created_at: Date;
}
