/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, ManyToOne, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import Track from './Track';
import User from './User';

@Entity()
export default class History extends BaseEntity {
  @PrimaryColumn()
  @OneToOne(() => User)
  @JoinColumn()
  user_id: number;

  @ManyToOne(() => Track, (track: Track)=> track, {cascade:true})
  tracks: Promise<Track[]>;

  @Column()
  created_at: Date;
}
