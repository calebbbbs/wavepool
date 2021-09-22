/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from "type-graphql";
import User from './User';
import RecommendedGenre from './RecommendedGenre'

@Entity()
@ObjectType()
export default class Friend extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  user_id: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.friends, {cascade:true})
  user!: Promise<User | undefined>;

  @Field(() => String)
  @Column()
  friend_id: string;

  // @Field(() => String)
  // @Column({nullable: true})
  // friend_photo?: string;

  @Field(() => String)
  @Column()
  friend_name: string;

  @Field(() => Boolean)
  @Column()
  friend_status: boolean;

  @Field(() => Number)
  @Column()
  friend_score: number;

  @Field(() => Number)
  @Column()
  number_of_likes: number;

  @Field(() => Number)
  @Column()
  number_of_songs: number;

  @Field(() => [RecommendedGenre], {nullable: true})
  @OneToMany(() => RecommendedGenre, (recommendedGenre: RecommendedGenre) => recommendedGenre.friend)
  recommendedGenres!: Promise<RecommendedGenre[]>;
}