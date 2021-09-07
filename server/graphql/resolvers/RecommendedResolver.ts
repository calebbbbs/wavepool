import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { getConnection } from "typeorm";
import { CreateRecommendedInput, RemoveRecommendedInput } from '../inputs'
import { getArtistData } from '../../spotify/helpers'
import RecommendedTrack from "../../db/entities/RecommendedTrack";
import RecommendedGenre from "../../db/entities/RecommendedGenre";
import User from '../../db/entities/User';
import Friend from '../../db/entities/Friend';

@Resolver()
export class RecommendedResolver {
  @Query(() => [RecommendedTrack])
  getRecommended(): Promise<RecommendedTrack[]> {
    return RecommendedTrack.find();
  }

  @Mutation(() => RecommendedTrack)
  async createRecommended(@Arg("data") data: CreateRecommendedInput) {
    const { user_id, friend_id, track_title, track_uri, artists, album_title, album_art, album_uri, artist_uri } = data;
    const user = await User.findOne({where: {user_id: friend_id}});
    const friend = await User.findOne({where: { user_id: user_id}});
    const track = new RecommendedTrack();
    
    const friendship = await Friend.findOne({where: {user_id: friend_id, friend_id: user_id}});
  
    if(friendship){
      friendship.number_of_songs++;
      await friendship.save();
      const recommendedGenres = await friendship.recommendedGenres;
      if(friend && user) {
        const genres = await getArtistData(artist_uri, user.access_token);
        console.log(recommendedGenres);
        genres.forEach((genre: string) => {
          let contains = false;
          recommendedGenres.forEach((recGenre: RecommendedGenre) => {
            if(genre === recGenre.genre) {
              recGenre.count++;
              recGenre.save();
              contains = true;
            }
          })
          if(!contains) {
            createGenre(friendship.id, genre);
          }
          console.log(friendship);
        });
  
        track.user_id = user_id;
        track.friend_id = friend_id;
        track.friend_name = friend.user_name;
        track.track_title = track_title;
        track.track_uri = track_uri;
        track.artists = artists;
        track.album_title = album_title;
        track.album_art = album_art;
        track.album_uri = album_uri;
        track.in_queue = true;
        track.comment_text = '';
        await track.save()
      }
    }

    await getConnection()
      .createQueryBuilder()
      .relation(User, "recommendedTracks")
      .of(friend_id)
      .add(track);
    return track;
  }

  @Mutation(() => Boolean)
  async RemoveRecommended(@Arg("data") data: RemoveRecommendedInput) {
    const { user_id, track_title } = data;
    const recommended = await RecommendedTrack.findOne({where: {user_id: user_id, track_title: track_title}});
    if(!recommended) { return false }
    await recommended.remove();
    return true;
  }
}

const createGenre = async(id: String, genre: string) => {
  let newGenre = new RecommendedGenre();
  newGenre.genre = genre;
  newGenre.count = 1;
  await newGenre.save();
  await getConnection()
    .createQueryBuilder()
    .relation(Friend, "recommendedGenres")
    .of(id)
    .add(newGenre);
}