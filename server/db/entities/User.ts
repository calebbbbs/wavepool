/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";


@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  user_id: string;

  @Field(() => String)
  @Column()
  user_name: string;

  // @Field(() => String)
  // @Column()
  // user_photo: string;

  @Field(() => String)
  @Column()
  access_token: string;

  @Field(() => String)
  @Column()
  refresh_token: string;

  // @Field(() => String, {nullable: true})
  // @Column()
  // photo: string;


  @Field(() =>[User], {nullable: true})
  @ManyToMany(() => User, user => user.friends)
  @JoinTable()
  friends: User[];

  // @Field(() => [User], {nullable: true})
  // @ManyToMany(() => User, user => user.pending_friends)
  // @JoinTable()
  // pending_friends: User[];
}
