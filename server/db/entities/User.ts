/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import Friend from './Friend';


@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  user_id: string;

  @Field(() => String)
  @Column()
  user_name: string;

  @Field(() => String)
  @Column()
  user_email: string;

  @Field(() => String)
  @Column()
  access_token: string;

  @Field(() => String)
  @Column()
  refresh_token: string;

  @Field(() => [Friend], {nullable: true})
  @OneToMany(() => Friend, (friend: Friend) => friend.user)
  friends: Promise<Friend[]>;
}
