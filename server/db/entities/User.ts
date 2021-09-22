/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import Friend from './Friend';
import RecommendedTrack from './RecommendedTrack';


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

  @Field(() => Boolean)
  isLoggedIn: boolean;

  @Field(() => [Friend], {nullable: true})
  @OneToMany(() => Friend, (friend: Friend) => friend.user)
  friends!: Promise<Friend[]>;

  @Field(() => [RecommendedTrack], {nullable: true})
  @OneToMany(() => RecommendedTrack, (recommendedTrack: RecommendedTrack) => recommendedTrack.user)
  recommendedTracks!: Promise<RecommendedTrack[]>;

  // @Field(() => [Notif], {nullable: true})
  // @OneToMany(() => Notif, (notif: Notif) => notif.user)
  // notifications!: Promise<Notif[]>;
}
