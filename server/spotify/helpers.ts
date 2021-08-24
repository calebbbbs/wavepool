import axios, { AxiosError } from "axios";
import SpotifyWebApi from "spotify-web-api-node";


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'http://localhost:4000/auth/spotify/callback'
});

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

const getUsersPlaylists = async (access_token: string) =>{
  spotifyApi.setAccessToken(access_token);
  spotifyApi.getUserPlaylists()
.then((response) =>{

  // const res: any[] = [];
  // response.body.items.forEach((item: any) => res.push(item));
  // setUserPlaylists(response.body.items);
  console.log((response.body.items));
  return response;
})
.catch((error: AxiosError) =>{
  console.log('Error from getUsersPlaylists', error);
});
}

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

const querySpotify = (query: string, access_token: string) => {
  return axios({
     url: `https://api.spotify.com/v1/search?q=${query}&type=track`,
     method: "get",
     headers: {
       Authorization: `Bearer ${access_token}`,
     },
   }).then((data) => {
       return data.data.tracks.items;
   });
 }


export {
  spotifyApi,
  getRecentlyPlayed,
  getUsersCurrentPlayback,
  addToQueue,
  getUsersPlaylists,
  querySpotify
}

