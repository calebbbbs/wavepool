/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import History from './History';

@Entity()
@ObjectType()
export default class HistoryGenre extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Field(() => String)
  genre: string;

  @Column()
  @Field(() => Number)
  count: number;

  @Field(() => History)
  @ManyToOne(() => History, (history: History) => history.historyGenres, {cascade:true})
  history!: Promise<History | undefined>;
}