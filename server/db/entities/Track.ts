/* eslint-disable camelcase */
import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import Artist from './Artist';
import { ObjectType, Field, ID, Int } from "type-graphql";
@Entity()
@ObjectType()
export default class Track extends BaseEntity {
 @Field(() => ID)
  @PrimaryColumn()
  track_id: number;

  @Field(() => String)
 @Column()
  spotify_uri: string;

  @Field(() => Artist)
  @ManyToOne(() => Artist, artist => artist, {cascade:true})
  artist: Artist;

  @Field(() => Int)
  @Column()
  album_id: number;

  @Field(() => String)
  @Column()
  album_uri: string;
}
