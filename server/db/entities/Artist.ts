/* eslint-disable camelcase */
import { Field, ObjectType } from 'type-graphql';
import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@ObjectType()
@Entity()
export default class Artist extends BaseEntity {
  @Field(() => Number)
  @PrimaryColumn()
  artist_id: number;

  @Field(() => String)
  @Column()
  artist_name: string;

  @Field(() => String)
  @Column()
  artist_uri: string;

  @Field(() => String)
  @Column()
  artists_popularity: string;

  @Field(() => String)
  @Column()
  artists_followers: string;

  @Field(() => [String])
  @Column("text", { array: true })
  artists_genres: string[];
}
