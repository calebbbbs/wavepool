/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field } from "type-graphql";
import User from './User';

@Entity()
@ObjectType()
export default class HistoryTrack extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  user_id: string;

  @Field(() => String)
  @Column()
  track_title: string;

  @Field(() => String)
  @Column()
  played_at: string;

  @Field(() => String)
  @Column()
  track_uri: string;
 
  @Field(() => [String])
  @Column("text", { array: true })
  artists: string[];
 
  @Field(() => String)
  @Column()
  album_title: string;

  @Field(() => String)
  @Column()
  album_art: string;

  @Field(() => String)
  @Column()
  album_uri: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.historyTracks, {cascade:true})
  user!: Promise<User | undefined>;

  @Field(() => Number)
  @Column({nullable: true, type: 'real'})
  danceability: string;

  @Field(() => Number)
  @Column({nullable: true, type: 'real'})
  energy: string;

  @Field(() => Number)
  @Column({nullable: true, type: 'real'})
  loudness: string;

  @Field(() => Number)
  @Column({nullable: true, type: 'real'})
  acousticness: string;

  @Field(() => Number)
  @Column({nullable: true, type: 'real'})
  instrumentalness: string;
}