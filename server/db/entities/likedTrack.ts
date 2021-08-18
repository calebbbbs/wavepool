/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export default class LikedTrack extends BaseEntity {
  @PrimaryColumn()
  user_id: number;

  @Column()
  track_id: number;
}
