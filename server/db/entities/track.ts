/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class track {
  @PrimaryColumn()
  track_id: number;

  @Column()
  spotify_uri: string;

  @ManyToOne(() => Artist, artist => artist.tack)
  Artist: artist;

  @Column()
  album_id: number;

  @Column()
  album_uri: string;
}
