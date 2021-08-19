/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";


@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  user_id: number;

  @Field(() => String)
  @Column()
  user_name: string;

  @Field(() => User)
  @ManyToMany(() => User, user => user.friends)
  @JoinTable()
  friends: User[];

  @Field(() => User)
  @ManyToMany(() => User, user => user.pending_friends)
  @JoinTable()
  pending_friends: User[];
}
