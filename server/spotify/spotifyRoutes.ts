import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import User from "../db/entities/User";
import {
  spotifyApi,
  getRecentlyPlayed,
  getUsersCurrentPlayback,
  addToQueue,
  querySpotify
} from './helpers'

const spotifyRouter = Router();

spotifyRouter.get("/getRecentlyPlayed/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const user = await User.findOne({ where: { user_id: user_id } });
 if(user){
  return getRecentlyPlayed(user.access_token).then(data => {
    return res.send(data)});
 } else {
  return res.sendStatus(404);
 }
});



spotifyRouter.get('/currPlayback/:user_id', async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const user = await User.findOne({ where: { user_id: user_id } });
  if(user){
    return getUsersCurrentPlayback(user.access_token).then((data: any) => {
    return res.send(data.data);
  });
  } else{
   return res.sendStatus(404);
  }
})

spotifyRouter.get('/next/:user_id', async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const user = await User.findOne({ where: { user_id: user_id } });
  if(user){
    const {access_token} = user;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.skipToNext()
    return res.sendStatus(200);
  } else {
    return res.sendStatus(404)
  }
})

spotifyRouter.get('/prev/:user_id', async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const user = await User.findOne({ where: { user_id: user_id } });
  if(user){
    const {access_token} = user;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.skipToPrevious()
    return res.sendStatus(200);
  } else {
    return res.sendStatus(404)
  }
})

spotifyRouter.get('/play/:user_id', async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const user = await User.findOne({ where: { user_id: user_id } });
  if(user){
    const {access_token} = user;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.play()
   return res.sendStatus(200);
  } else {
    return res.sendStatus(404)
  }
})

spotifyRouter.get('/pause/:user_id', async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const user = await User.findOne({ where: { user_id: user_id } });
  if(user){
    const {access_token} = user;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.pause()
   return res.sendStatus(200);
  } else {
    return res.sendStatus(404)
  }
})



spotifyRouter.get("/addToQueue/:user_id/:spotify_uri", async (req: Request, res: Response) => {
  const { spotify_uri } = req.params;
  const { user_id } = req.params;

  const user = await User.findOne({ where: { user_id: user_id } });
  if(user){
    const {access_token} = user;
 return addToQueue(access_token, spotify_uri)
    .then((data) => res.status(201).send(data))
    .catch((error) => console.log(error));
  } else {
  return res.sendStatus(404);
  }
});


spotifyRouter.get('/query/:user_id/:query', async (req: Request, res: Response) => {
  const {user_id, query} = req.params;
  const user = await User.findOne({ where: { user_id: user_id } });
  if(user){
    const {access_token} = user;
   return await querySpotify(query, access_token).then((data) => {
     return res.send(data);
   })
  } else {
  return res.sendStatus(404);
  }
})

export default spotifyRouter
