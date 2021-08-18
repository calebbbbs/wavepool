/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Track } from './Track';

@Entity()
export default class History extends BaseEntity {
  @PrimaryColumn()
  user_id: number;

  @ManyToOne(() => Track, track => track.history)
  track: Track;

  @Column()
  created_at: Date;
}
