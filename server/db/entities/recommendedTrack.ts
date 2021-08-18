/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import User from './User';

@Entity()
export default class RecommendedTrack extends BaseEntity {
  @PrimaryColumn()
  user_id: number;

  @Column()
  track_id: number;

  @Column()
  friend_id: number;
}