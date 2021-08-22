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
    const { user_id, friend_id, track_title, spotify_uri, artists, album_title, album_art } = data;
    const friend = await User.findOne({where: { user_id: user_id}});
    const track = new RecommendedTrack();
    if(friend) {
      track.user_id = user_id;
      track.friend_id = friend_id;
      track.friend_name = friend.user_name;
      track.track_title = track_title;
      track.spotify_uri = spotify_uri;
      track.artists = artists;
      track.album_title = album_title;
      track.album_art = album_art;
      await track.save()
    }
    
    await getConnection()
    .createQueryBuilder()
    .relation(User, "recommendedTracks")
    .of(friend_id)
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