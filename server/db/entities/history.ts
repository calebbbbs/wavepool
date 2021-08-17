/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { track } from './track';

@Entity()
export default class history {
  @PrimaryGeneratedColumn()
  user_id: number;

  @ManyToOne(() => Track, track => track.history)
  Track: track;

  @Column()
  created_at: Date;
}
