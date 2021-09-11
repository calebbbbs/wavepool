import { getConnection } from "typeorm";
import axios from "axios";
import HistoryArtist from "../db/entities/HistoryArtist";
import HistoryTrack from "../db/entities/HistoryTrack";
import User from "../db/entities/User";

const archiveHistory = async (data: any, user_id: string, access_token: string) => {
  try {
    const { items } =  data.body;
    return Promise.all(items.map((trackObj: any) => {
        return createHistoryTrack(trackObj, user_id)
      }
    )).then((tracks) => {
     return getMultipleArtistData(tracks, access_token);
    }).then((tracks) => {
      return getMultipleTrackData(tracks, access_token);
    })
    .then((tracks) => {
      updateHistoryTrack();
      createHistoryArtist(tracks, user_id);
      createHistoryGenre(tracks, user_id);
    });
  } catch (err) {
    console.error('Error archiving data\'s body!');
  };
  return;
}

const getMultipleArtistData = async (tracks: any, access_token: string) => {
  const artistIds: Array<string> = [];
  tracks.forEach((track: any) => {
    if(track){
      artistIds.push(track.artists[0].id);
    }
  });

  if(artistIds.length > 0) {
    const urlIds = artistIds.join(',');
    return await axios({
      url: `https://api.spotify.com/v1/artists?ids=${urlIds}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(({data}) => {
      tracks.forEach((track: any, index: number) => {
        track.artists[0].genres = data.artists[index].genres;
        track.artists[0].image = data.artists[index].images[1];
      });
      return tracks;
    });
  }
  return tracks;
};

const getMultipleTrackData = async (tracks: any, access_token: string) => {
  const trackIds: Array<string> = [];
  tracks.forEach((track: any) => {
    if(track){
      trackIds.push(track.id);
    }
  });

  if(trackIds.length > 0) {
    const urlIds = trackIds.join(',');
    return await axios({
      url: `https://api.spotify.com/v1/audio-features?ids=${urlIds}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(({data}) => {
      const { audio_features } = data;
      //console.log("tracks", tracks[0]);
      //console.log("data", audio_features);
      tracks.forEach((track: any, index: number) => {
        track.features = {};
        track.features.danceability = audio_features[index].danceability;
        track.features.energy = audio_features[index].energy;
        track.features.loudness = audio_features[index].loudness;
        track.features.acousticness = audio_features[index].acousticness;
        track.features.instrumentalness = audio_features[index].instrumentalness;
      });
      console.log("tracks", tracks[0]);
      return tracks;
    });
  }
  return tracks;
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

const createHistoryTrack = async (trackObj: any, user_id: string) => {
  const { played_at, track } = trackObj;
  const { name, uri, album } = track;

  const historyTrack = await HistoryTrack.findOne({where:{user_id: user_id, played_at: played_at, track_title: name}});
  if(historyTrack === undefined) {
    const artists = track.album.artists.map((artist: any) => {
      return artist.name;
    });

    track.played_at = played_at;

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

const updateHistoryTrack = async () => {
  
}

const createHistoryArtist = async (tracks: Array<any>, user_id: string) => {
  let artistObj: any = {};
  tracks.forEach((track) => {
    if(track){
      if(artistObj.hasOwnProperty(track.artists[0].name)){
        artistObj[track.artists[0].name].count += 1;
        artistObj[track.artists[0].name].time_listened += track.duration_ms;
      } else {
        const tempArtist = {
          artist_name: track.artists[0].name,
          artist_uri: track.artists[0].uri,
          time_listened: track.duration_ms,
          is_explicit: track.explicit,
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
       createArtist(artist, user_id);
      }
    ))
  } catch (err) {
    console.error('Error archiving artists!', err);
  };
}

const createArtist = async(artistObj: any, user_id: string) => {
  const { artist_uri, artist_name, count, time_listened, is_explicit } = artistObj;
  let historyArtist = await HistoryArtist.findOne({where:{user_id: user_id, artist_name: artist_name}});
  if(historyArtist) {
    await getConnection()
      .createQueryBuilder()
      .update(HistoryArtist)
      .set({count: () => `count + ${count}`})
      .set({time_listened: () => `time_listened + ${time_listened}`})
      .where("user_id = :user_id AND artist_name = :artist_name", {user_id: user_id, artist_name: artist_name})
      .execute();
  } else {
    let newArtist = new HistoryArtist();
    newArtist.artist_name = artist_name;
    newArtist.artist_uri = artist_uri;
    newArtist.user_id = user_id;
    newArtist.is_explicit = is_explicit;
    newArtist.time_listened = time_listened
    newArtist.count = count;
    await newArtist.save();
    return await getConnection()
      .createQueryBuilder()
      .relation(User, "historyArtists")
      .of(user_id)
      .add(newArtist);
  }
}

const createHistoryGenre = async (tracks: Array<any>, user_id: string) => {
  let genreObj: any = {};
  tracks.forEach((track) => {
    if(track){
      if(genreObj.hasOwnProperty(track.artists[0].name)){
        genreObj[track.artists[0].name].count += 1;
        genreObj[track.artists[0].name].time_listened += track.duration_ms;
      } else {
        const tempArtist = {
          artist_name: track.artists[0].name,
          artist_uri: track.artists[0].uri,
          time_listened: track.duration_ms,
          is_explicit: track.explicit,
          count: 1
        }
        genreObj[track.artists[0].name] = tempArtist;
      }
    }
  });
  // const artistArray: Array<string> = Object.values(artistObj);

  // try {
  //   Promise.all(artistArray.map(
  //     (artist) => {
  //      createArtist(artist, user_id);
  //     }
  //   ))
  // } catch (err) {
  //   console.error('Error archiving artists!', err);
  // };
}

const getTrackFeature = async (track_uri: string, access_token: string) => {
  const track_id = track_uri.split(':')[2];
  return await axios({
    url: `https://api.spotify.com/v1/audio-features/${track_id}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then(({data}) => {
    return data.genres;
  }).catch(error => console.log(error));
};

export {
  archiveHistory,
  getArtistData,
  getTrackFeature
}