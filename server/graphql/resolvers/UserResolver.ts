import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreateUserInput }from '../inputs'
import User from "../../db/entities/User";
import HistoryGenre from "../../db/entities/HistoryGenre";
import HistoryArtist from "../../db/entities/HistoryArtist";
//import { getConnection } from "typeorm";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User)
  getUser(@Arg("user_id") user_id: String): Promise<User | undefined> {
    return User.findOne({ where: {user_id: user_id}});
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput)  {
    const { user_id, user_name, email, access_token, refresh_token} = data;

    const user = new User();
    user.user_id = user_id;
    user.user_name = user_name;
    user.user_email = email;
    user.access_token = access_token;
    user.refresh_token = refresh_token;
    await user.save();
    return user;
  }

  @Query(() => [HistoryGenre])
  async getUserGenres(@Arg("user_id") user_id: string): Promise<HistoryGenre[] | undefined> {
    return HistoryGenre.find({
      where: {user_id: user_id},
      order: {count: "DESC"},
      take: 25
    })
  }

  @Query(() => [HistoryArtist])
  async getUserArtists(@Arg("user_id") user_id: string): Promise<HistoryArtist[] | undefined> {
    return HistoryArtist.find({
      where: {user_id: user_id},
      order: {count: "DESC"},
      take: 25
    })
  }
}


// let analyticsResponse: any = {};
//     const historyGenres = await HistoryGenre.find({
//       where: {user_id: user_id},
//       order: {count: "DESC"},
//       take: 25
//     })

//     let genres: any = {
//       genre: [],
//       count: []
//     }

//     historyGenres.forEach(({genre, count}) => {
//       genres.genre.push(genre);
//       genres.count.push(count);
//     });

//     analyticsResponse.genres = genres;

//     const historyArtists = await HistoryArtist.find({
//       where: {user_id: user_id},
//       order: {count: "DESC"},
//       take: 25
//     })

//     let artists: any = {
//       artist: [],
//       count: []
//     }

//     historyArtists.forEach(({artist_name, count}) => {
//       artists.artist.push(artist_name);
//       artists.count.push(count);
//     });

//     analyticsResponse.artists = artists;
