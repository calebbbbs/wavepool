import axios, { AxiosError } from "axios";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri:
    "http://ec2-18-220-159-62.us-east-2.compute.amazonaws.com:8080/auth/spotify/callback",
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
    method: "get",
    url: "https://api.spotify.com/v1/me/player",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  return await axios(getCurrentPlayback)
    .then((response) => {
      return response;
    })
    .catch((error: AxiosError) => {
      console.log("Error from getUsersCurrentPlayback", error);
    });
};

const getUserPlaylists = async (access_token: string) => {
  spotifyApi.setAccessToken(access_token);
  return await spotifyApi
    .getUserPlaylists()
    .then((response) => {
      return response.body.items;
    })
    .catch((error: AxiosError) => {
      console.log("Error from getUserPlaylists", error);
    });
};

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
    .then((response) => response)
    .catch((error: AxiosError) => {
      console.log("Error from addToQueue", error);
    });
};

const playNow = async (access_token: string, uri: string) => {
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
      spotifyApi.setAccessToken(access_token);
      spotifyApi.skipToNext();
    })
    .catch((error: AxiosError) => {
      console.log("Error from addToQueue", error);
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
};

const addToPlaylist = async (
  access_token: string,
  playlist_id: string,
  track_uri: string
) => {
  spotifyApi.setAccessToken(access_token);
  return await spotifyApi
    .addTracksToPlaylist(playlist_id, [track_uri])
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};

const createPlaylist = async (
  access_token: string,
  playlist_name: string,
  playlist_desc: string
) => {
  spotifyApi.setAccessToken(access_token);
  return await spotifyApi
    .createPlaylist(playlist_name, { description: playlist_desc, public: true })
    .then(
      (data) => data,
      (err) => console.warn(err)
    );
};

export {
  spotifyApi,
  getRecentlyPlayed,
  getUsersCurrentPlayback,
  addToQueue,
  playNow,
  getUserPlaylists,
  querySpotify,
  addToPlaylist,
  createPlaylist,
};
