/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field } from "type-graphql";
import User from './User';


@Entity()
@ObjectType()
export default class Friend extends BaseEntity {
  @Field(() => String, {nullable: true})
  @PrimaryColumn()
  user_id: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.friends, {cascade:true})
  user!: Promise<User>;

  @Field(() => String, {nullable: true})
  @Column()
  friend_id: string;

  @Field(() => Boolean, {nullable: true})
  @Column()
  friend_status: boolean;
}