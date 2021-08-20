/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";


@Entity()
@ObjectType()
export default class Friend extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  user_id: number;

  @Field(() => String)
  @Column()
  friend_id: string;

  @Field(() => Boolean)
  @Column()
  friend_status: boolean;
}