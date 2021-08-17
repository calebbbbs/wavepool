/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class artist {
  @PrimaryGeneratedColumn()
  artist_id: number;

  @Column()
  artist_name: string;

  @Column()
  artist_uri: string;

  @Column()
  artists_popularity: string;

  @Column()
  artists_followers: string;

  @Column()
  artists_genres: array;
}
