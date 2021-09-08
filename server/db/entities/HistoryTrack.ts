/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import History from './History';

@Entity()
@ObjectType()
export default class HistoryTrack extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Field(() => ID)
  user_id: String;

  @Field(() => String)
  @Column()
  track_title: string;

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

  @Field(() => History)
  @ManyToOne(() => History, (history: History) => history.historyTracks, {cascade:true})
  history!: Promise<History | undefined>;
}