/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export default class Artist extends BaseEntity {
  @PrimaryColumn()
  artist_id: number;

  @Column()
  artist_name: string;

  @Column()
  artist_uri: string;

  @Column()
  artists_popularity: string;

  @Column()
  artists_followers: string;

  @Column("text", { array: true })
  artists_genres: string[];
}
