/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Track } from './Track';

@Entity()
export default class history {
  @PrimaryColumn()
  user_id: number;

  @ManyToOne(() => Track, track => track.history)
  track: Track;

  @Column()
  created_at: Date;
}
