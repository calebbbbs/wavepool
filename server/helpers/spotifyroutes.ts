import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import SpotifyWebApi from "spotify-web-api-node";
import User from "../db/entities/User";
import axios, {AxiosError} from 'axios';


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: "http://localhost:4000/auth/spotify/callback",
});

const spotifyRouter = Router();
const getRecentlyPlayed = async (access_token: string) => {
  spotifyApi.setAccessToken(access_token);
  return await spotifyApi
    .getMyRecentlyPlayedTracks({
      limit: 10,
    })
    .then((data) => {
      // Output items
      return data;
    })
    .catch((error) => {
      console.log("Error from getRecentlyPlayed", error);
    });
};

spotifyRouter.get("/getRecentlyPlayed/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const user = await User.findOne({ where: { user_id: user_id } });
 if(user){
  return getRecentlyPlayed(user.access_token).then(data => {
    return res.send(data)});
 } else {
   res.sendStatus(404);
   return;
 }
});

const getUsersCurrentPlayback = async (access_token: string) => {
  const getCurrentPlayback: any = {
    method: 'get',
    url: 'https://api.spotify.com/v1/me/player',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  };

  return await axios(getCurrentPlayback)
    .then((response) => {
      return response
    })
    .catch((error: AxiosError) => {
      console.log('Error from getUsersCurrentPlayback', error);
    });
}


spotifyRouter.get('/currPlayback/:user_id', async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const user = await User.findOne({ where: { user_id: user_id } });
  if(user){
    const butt: any = await getUsersCurrentPlayback(user.access_token)
    res.send(butt.data);
    return;
  } else{
   return res.sendStatus(404);
  }
})


spotifyRouter.get('/next/:user_id', async (req: Request, res: Response) => {
  const{ user_id } = req.params;
  const user = await User.findOne({where: {user_id: user_id} });
  if (user){
    const {access_token} = user;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.skipToNext()
    res.sendStatus(200);
    return;
  }
});


spotifyRouter.get('/prev/:user_id', async (req: Request, res: Response) => {
  const{ user_id } = req.params;
  const user = await User.findOne({where: {user_id: user_id} });
  if (user){
    const {access_token} = user;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.skipToPrevious()
    res.sendStatus(200);
    return;
  }
});


spotifyRouter.get('/play/:user_id', async (req: Request, res: Response) => {
  const{ user_id } = req.params;
  const user = await User.findOne({where: {user_id: user_id} });
  if (user){
    const {access_token} = user;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.play()
    res.sendStatus(200);
    return;
  }
});


spotifyRouter.get('/pause/:user_id', async (req: Request, res: Response) => {
  const{ user_id } = req.params;
  const user = await User.findOne({where: {user_id: user_id} });
  if (user){
    const {access_token} = user;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.pause()
    res.sendStatus(200);
    return;
  }
});

const addToQueue = async (access_token: String, uri: String) => {
  const toQueue: any = {
    method: "POST",
    url: `https://api.spotify.com/v1/me/player/queue?uri=${uri}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };
  await axios(toQueue)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error: AxiosError) => {
      console.log('Error from addToQueue' ,error);
    });
};

spotifyRouter.get("/addToQueue/:user_id/:spotify_uri", async (req: Request, res: Response) => {
  const { user_id, spotify_uri } = req.params;
  const user = await User.findOne({where: {user_id: user_id} });
  if(user){
    const {access_token} = user;
    return await addToQueue(access_token, spotify_uri)
    .then((data) =>  res.status(201).send(data))
    .catch((error) => console.log(error));
  } else {
    return res.sendStatus(404);
  }
});

// spotifyRouter.post()

export default spotifyRouter
