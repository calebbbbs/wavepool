import express, {Router, Request, Response} from 'express';


import { getRecentlyPlayed, getUsersCurrentPlayback, getUsersPlaylis, addToQueue} from '../helpers';

const spotifyRouter = Router();
spotifyRouter.use(express.json);



spotifyRouter.post('/getRecentlyPlayed', (req: Request, res: Response) => {
  getRecentlyPlayed
})

spotifyRouter.get("/addToQueue/:access_token/:uri", (req: Request, res: Response) => {
  const { access_token, uri } = req.params;
  addToQueue(access_token, uri)
    .then((data) => res.status(201).send(data))
    .catch((error) => console.log(error));
});

// spotifyRouter.post()

export default {
  spotifyRouter,
};