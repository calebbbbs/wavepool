/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class recommendedTrack {
  @PrimaryColumn()
  user_id: number;

  @Column()
  track_id: number;

  @Column()
  friend_id: number;
}