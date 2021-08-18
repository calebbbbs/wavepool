/* eslint-disable camelcase */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from "./Base";

@Entity()
export default class Track extends BaseEntity {
  @PrimaryColumn()
  track_id: number;

 @Column()
  spotify_uri: string;

  @ManyToOne(() => Artist, artist => artist.tack)
  artist: Artist;

  @Column()
  album_id: number;

  @Column()
  album_uri: string;
}
