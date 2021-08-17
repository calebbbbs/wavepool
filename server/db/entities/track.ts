/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class track {
  @PrimaryGeneratedColumn()
  track_id: number;

  @Column()
  spotify_uri: string;

  @Column()
  artist_id: number;

  @Column()
  album_id: number;

  @Column()
  album_uri: string;
}
