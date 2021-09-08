/* eslint-disable camelcase */
import { Entity, PrimaryColumn, BaseEntity, OneToMany, OneToOne } from 'typeorm';
import { ObjectType, Field } from "type-graphql";
import User from './User';
import HistoryGenre from './HistoryGenre';
import HistoryTrack from './HistoryTrack';

@Entity()
@ObjectType()
export default class History extends BaseEntity {
  @PrimaryColumn()
  @Field(() => String)
  user_id: String;

  @Field(() => User)
  @OneToOne(() => User, (user: User) => user.trackHistory, {cascade:true})
  user!: Promise<User | undefined>;

  @Field(() => [HistoryGenre], {nullable: true})
  @OneToMany(() => HistoryGenre, (historyGenre: HistoryGenre) => historyGenre.history)
  historyGenres!: Promise<HistoryGenre[]>;

  @Field(() => [HistoryTrack], {nullable: true})
  @OneToMany(() => HistoryTrack, (historyTrack: HistoryTrack) => historyTrack.history)
  historyTracks!: Promise<HistoryTrack[]>;
}