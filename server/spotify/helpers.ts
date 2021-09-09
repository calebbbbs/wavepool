import axios, { AxiosError } from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { getConnection } from "typeorm";
import HistoryTrack from "../db/entities/HistoryTrack";
import HistoryArtist from "../db/entities/HistoryArtist";
import User from "../db/entities/User";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri:
    "http://ec2-18-220-159-62.us-east-2.compute.amazonaws.com:8080/auth/spotify/callback",
});

const getRecentlyPlayed = async (access_token: string, user_id: string) => {
  spotifyApi.setAccessToken(access_token);
  return await spotifyApi
    .getMyRecentlyPlayedTracks({
      limit: 25,
    })
    .then((data) => {
      archiveHistory(data, user_id);
      // Output items
      return data;
    })
    .catch((error) => {
      console.log("Error from getRecentlyPlayed", error);
    });
};

const archiveHistory = async (data: any, user_id: string) => {
  data.body.items.forEach((trackObj: any) => {
    createHistoryTrack(trackObj, user_id);
  });
}

const createHistoryTrack = async (trackObj: any, user_id: string) => {
  const { played_at, track } = trackObj;
  const { name, uri, album } = track;

  const historyTrack = await HistoryTrack.findOne({where:{user_id: user_id, played_at: played_at, track_title: name}});
  if(!historyTrack) {
    const artists = track.album.artists.map((artist: any) => {
      createHistoryArtist(artist, user_id);
      return artist.name;
    });
    
    const newTrack = await new HistoryTrack();
    newTrack.user_id = user_id;
    newTrack.track_title = name;
    newTrack.played_at = played_at;
    newTrack.track_uri = uri;
    newTrack.artists = artists;
    newTrack.album_title = album.name;
    newTrack.album_art = album.images[1].url;
    newTrack.album_uri = album.uri;
    await newTrack.save();

    await getConnection()
      .createQueryBuilder()
      .relation(User, "historyTracks")
      .of(user_id)
      .add(newTrack);
    return newTrack;
  }
  return false;
}

const createHistoryArtist = async (artistObj: any, user_id: string) => {
  const {uri} = artistObj;
  const artist_id = uri.split(':')[2];
  console.log(artist_id);
  //console.log(artistObj);
  const user = await User.findOne({where: {user_id: user_id}});

  if(user) {
    const historyArtist = await user.historyArtists;
    console.log(historyArtist);
  }
  HistoryArtist;
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

const getArtistData = async (artist_uri: string, access_token: string) => {
  return await axios({
    url: `https://api.spotify.com/v1/artists/${artist_uri}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then(({data}) => {
    return data.genres;
  }).catch(error => console.log(error));
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

// const getTrackInfo = (track_uri: string, access_token: string) => {
//   const track_id = track_uri.split(':')[2];
//   return axios({
//     url: `https://api.spotify.com/v1/tracks/${track_id}`,
//     method: "get",
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   }).then((data) => {
//     const  { artists } = data;
//     artist_id = artists[0].id;
    
//     return axios({
//       url: `https://api.spotify.com/v1/artist/${artist_id}`,
//       method: "get",
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     }).then((data) => {
//       const { genres, images } = data;
//       track_data.generes = genres;
//       track_data.image = images[1];
//       return track_data;
//     });
//   });
// };

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
  getArtistData,
};
