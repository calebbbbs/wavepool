import axios, { AxiosError } from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { getConnection } from "typeorm";
import HistoryArtist from "../db/entities/HistoryArtist";
import HistoryTrack from "../db/entities/HistoryTrack";
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
  try {
    const { items } =  data.body;
    return Promise.all(items.map( (trackObj: any) => {
        return createHistoryTrack(trackObj, user_id)
      }
    )).then((tracks) => {
      createHistoryArtist(tracks, user_id);
    });
  } catch (err) {
    console.error('Error archiving data\'s body!');
  };
  return;
}

const createHistoryTrack = async (trackObj: any, user_id: string) => {
  const { played_at, track } = trackObj;
  const { name, uri, album } = track;
  //console.log(track);

  const historyTrack = await HistoryTrack.findOne({where:{user_id: user_id, played_at: played_at, track_title: name}});
  if(historyTrack === undefined) {
    const artists = track.album.artists.map((artist: any) => {
      return artist.name;
    });

    const newTrack = new HistoryTrack();
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
    return track; 
  }
  return;
}

const createHistoryArtist = async (tracks: Array<any>, user_id: string) => {
  let artistObj: any = {};
  tracks.forEach((track) => {
    if(track){
      if(artistObj.hasOwnProperty(track.artists[0].name)){
        artistObj[track.artists[0].name].count += 1;
      } else {
        const tempArtist = {
          artist_name: track.artists[0].name,
          artist_uri: track.artists[0].uri,
          count: 1
        }
        artistObj[track.artists[0].name] = tempArtist;
      }
    }
  });
  const artistArray: Array<string> = Object.values(artistObj);

  try {
    Promise.all(artistArray.map(
      (artist) => {
       console.log(artist)
       createArtist(artist, user_id);
      }
    ))
  } catch (err) {
    console.error('Error archiving artists!', err);
  };
}

const createArtist = async(artistObj: any, user_id: string) => {
  const { artist_uri, artist_name, count } = artistObj;
  console.log(artistObj);
  console.log(artist_uri);

  let historyArtist = await HistoryArtist.findOne({where:{user_id: user_id, artist_name: artist_name}});
  console.log(historyArtist);
  if(historyArtist) {
    await getConnection()
      .createQueryBuilder()
      .update(HistoryArtist)
      .set({count: () => `count + ${count}`})
      .where("user_id = :user_id AND artist_name = :artist_name", {user_id: user_id, artist_name: artist_name})
      .execute();
  } else {
    let newArtist = new HistoryArtist();
    newArtist.artist_name = artist_name;
    newArtist.artist_uri = artist_uri;
    newArtist.user_id = user_id;
    newArtist.count = count;
    await newArtist.save();
    return await getConnection()
      .createQueryBuilder()
      .relation(User, "historyArtists")
      .of(user_id)
      .add(newArtist);
  }
  
}

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
