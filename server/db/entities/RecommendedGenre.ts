/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import Friend from './Friend';

@Entity()
@ObjectType()
export default class RecommendedGenre extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Field(() => String)
  genre: string;

  @Column()
  @Field(() => Number)
  count: number;

  @Field(() => Friend)
  @ManyToOne(() => Friend, (friend: Friend) => friend.recommendedGenres, {cascade:true})
  friend!: Promise<Friend | undefined>;
}