import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { getConnection } from "typeorm";
import { CreateRecommendedInput, DeleteRecommendedInput } from '../inputs'
import RecommendedTrack from "../../db/entities/RecommendedTrack";
import User from '../../db/entities/User';

@Resolver()
export class RecommendedResolver {
  @Query(() => [RecommendedTrack])
  getRecommended(): Promise<RecommendedTrack[]> {
    return RecommendedTrack.find();
  }


  @Mutation(() => RecommendedTrack)
  async createRecommended(@Arg("data") data: CreateRecommendedInput) {
    const track = new RecommendedTrack();
    track.user_id = data.user_id;
    track.friend_id = data.friend_id;
    track.track_title = data.track_title;
    track.spotify_uri = data.spotify_uri;
    track.artists = data.artists;
    track.album_title = data.album_title;
    track.album_art = data.album_art;
    await track.save()

    await getConnection()
    .createQueryBuilder()
    .relation(User, "recommendedTracks")
    .of(data.user_id)
    .add(track);
  return track;
  }

  @Mutation(() => Boolean)
  async deleteRecommended(@Arg("data") data: DeleteRecommendedInput) {
    const { user_id, track_title } = data;
    const recommended = await RecommendedTrack.findOne({where: {user_id: user_id, track_title: track_title}});
    if(!recommended) { return false }
    await recommended.remove();
    return true;
  }
}