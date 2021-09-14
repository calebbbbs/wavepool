import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import HistoryArtist from '../db/entities/HistoryArtist';
import HistoryGenre from '../db/entities/HistoryGenre';
import Friend from '../db/entities/Friend';

const userRouter = Router();

userRouter.get(
  '/analytics/:user_id',
  async (req: Request, res: Response) => {
    const { user_id } = req.params;
    let analyticsResponse: Array<Array<Array<string | number>>> = [];
    
    const historyGenres: HistoryGenre[] = await HistoryGenre.find({
      where: {user_id: user_id},
      order: {count: "DESC"},
      take: 10
    })

    let genres: Array<Array<string | number>> = [[],[]]

    historyGenres.forEach(({genre, count}) => {
      genres[0].push(genre);
      genres[1].push(count);
    });

    analyticsResponse.push(genres);

    const historyArtists: HistoryArtist[] = await HistoryArtist.find({
      where: {user_id: user_id},
      order: {count: "DESC"},
      take: 10
    })

    let artists: Array<Array<string | number>> = [[],[]]

    historyArtists.forEach(({artist_name, count}) => {
      artists[0].push(artist_name);
      artists[1].push(count);
    });

    analyticsResponse.push(artists);

    const friendsData = await Friend.find({
      where: {user_id: user_id},
      order: {friend_score: "DESC"},
      take: 5
    })

    let friends: Array<Array<string | number>> = [[],[],[]]

    friendsData.forEach(({friend_name, number_of_likes, number_of_songs}) => {
      friends[0].push(friend_name);
      friends[1].push(number_of_songs - number_of_likes);
      friends[2].push(number_of_likes);
    });

    analyticsResponse.push(friends);
    console.log(analyticsResponse)
    return res.status(200).send(analyticsResponse);
  }
);

export default userRouter;