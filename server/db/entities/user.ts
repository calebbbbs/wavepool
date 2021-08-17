/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class user {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_name: string;
}
