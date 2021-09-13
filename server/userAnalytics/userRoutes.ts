import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import HistoryArtist from '../db/entities/HistoryArtist';
import HistoryGenre from '../db/entities/HistoryGenre';

const userRouter = Router();

userRouter.get(
  '/analytics/:user_id',
  async (req: Request, res: Response) => {
    const { user_id } = req.params;
    console.log(user_id);
    let analyticsResponse: any = {};
    const historyGenres = await HistoryGenre.find({
      where: {user_id: user_id},
      order: {count: "DESC"},
      take: 25
    })

    let genres: any = {
      genre: [],
      count: []
    }

    historyGenres.forEach(({genre, count}) => {
      genres.genre.push(genre);
      genres.count.push(count);
    });

    analyticsResponse.genres = genres;

    const historyArtists = await HistoryArtist.find({
      where: {user_id: user_id},
      order: {count: "DESC"},
      take: 25
    })

    let artists: any = {
      artist: [],
      count: []
    }

    historyArtists.forEach(({artist_name, count}) => {
      artists.artist.push(artist_name);
      artists.count.push(count);
    });

    analyticsResponse.artists = artists;
    return res.status(200).send(analyticsResponse);
  }
);

export default userRouter;