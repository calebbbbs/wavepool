import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreateTrackInput } from '../inputs'
import Track from "../../db/entities/Track";

@Resolver()
export class TrackResolver {
  @Query(() => [Track])
  getTracks(): Promise<Track[]> {
    return Track.find();
  }

  @Query(() => Track)
  getTrack(@Arg("track_id",() => String) track_id: string): Promise<Track | undefined> {
    return Track.findOne({ where: {track_id: track_id}});
  }

  @Mutation(() => Track)
  async createTrack(@Arg("data") data: CreateTrackInput) {
    const track = new Track();
    track.track_id = data.track_id;
    track.spotify_uri = data.spotify_uri;
    track.album_id = data.album_id;
    track.album_uri = data.album_uri;
    await track.save()
    return track;
  }
}