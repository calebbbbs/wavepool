/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class likedTrack {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  track_id: number;
}
