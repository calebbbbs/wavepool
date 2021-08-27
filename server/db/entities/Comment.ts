/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import RecommendedTrack from './RecommendedTrack';

@Entity()
@ObjectType()
export default class Comment extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Field(() => ID)
  user_id: String;

  @Field(() => String)
  @Column()
  friend_id: string;

  @Field(() => String)
  @Column()
  comment_text: string;

  @Field(() => RecommendedTrack)
  @ManyToOne(() => RecommendedTrack, (recommendedTrack: RecommendedTrack) => recommendedTrack.comments, {cascade:true})
  recommendedTrack!: Promise<RecommendedTrack | undefined>;
}