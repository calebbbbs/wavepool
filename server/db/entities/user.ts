/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, BaseEntity } from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @PrimaryColumn()
  user_id: number;

  @Column()
  user_name: string;

  @ManyToMany(() => User, user => user.friends, {cascade:true})
  @JoinTable()
  friends: User[];

  @ManyToMany(() => User, user => user.pending_friends, {cascade:true})
  @JoinTable()
  pending_friends: User[];
}
