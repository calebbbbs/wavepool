/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class pendingFriend {
  @PrimaryColumn()
  user_id: number;

  @Column()
  friend_id: number;
}