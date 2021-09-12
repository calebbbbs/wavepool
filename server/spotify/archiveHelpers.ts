import { getConnection } from "typeorm";
import axios from "axios";
import HistoryArtist from "../db/entities/HistoryArtist";
import HistoryTrack from "../db/entities/HistoryTrack";
import HistoryGenre from "../db/entities/HistoryGenre";
import User from "../db/entities/User";
import { Response, TrackObjectSimplified, PlayHistoryObject } from './spotifyInterfaces'

const archiveHistory = async (data: Response<any>, user_id: string, access_token: string) => {
  try {
    const { items } =  data.body;
    return Promise.all(items.map((trackObj: PlayHistoryObject) => {
        return createHistoryTrack(trackObj, user_id)
    }
    )).then((tracks: Array<any>) => {
     return getMultipleArtistData(tracks, access_token);
    }).then((tracks: Array<any>) => {
      return getMultipleTrackData(tracks, access_token);
    }).then((tracks: Array<any>) => {
      return Promise.all(tracks.map((track: any) => {
        return updateHistoryTrack(track, user_id)
      }))
    }).then((tracks: Array<any>) => {
      return createHistoryArtist(tracks, user_id);
      
    }).then((tracks: Array<any>) => {
      return createHistoryGenre(tracks, user_id);
    });
  } catch (err) {
    console.error('Error archiving data\'s body!');
  };
  return;
}

const getMultipleArtistData = async (tracks: Array<TrackObjectSimplified>, access_token: string) => {
  const artistIds: Array<string> = [];
  tracks.forEach((track: TrackObjectSimplified) => {
    if(track){
      artistIds.push(track.artists[0].id);
    }
  });

  if(artistIds.length > 0) {
    const urlIds: string = artistIds.join(',');
    return await axios({
      url: `https://api.spotify.com/v1/artists?ids=${urlIds}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(({data}) => {
      tracks.forEach((track: any, index: number) => {
        if(track) {
          track.artists[0].genres = data.artists[index].genres;
          track.artists[0].image = data.artists[index].images[1];
        }
      });
      return tracks;
    });
  }
  return tracks;
};

const getMultipleTrackData = async (tracks: Array<TrackObjectSimplified>, access_token: string) => {
  const trackIds: Array<string> = [];
  tracks.forEach((track: any) => {
    if(track){
      trackIds.push(track.id);
    }
  });

  if(trackIds.length > 0) {
    const urlIds: string = trackIds.join(',');
    return await axios({
      url: `https://api.spotify.com/v1/audio-features?ids=${urlIds}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }).then(({data}) => {
      const { audio_features } = data;
      tracks.forEach((track: any, index: number) => {
        if(track) {
          track.features = {};
          track.features.danceability = audio_features[index].danceability;
          track.features.energy = audio_features[index].energy;
          track.features.loudness = audio_features[index].loudness;
          track.features.acousticness = audio_features[index].acousticness;
          track.features.instrumentalness = audio_features[index].instrumentalness;
        }
      });
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

const createHistoryTrack = async (trackObj: PlayHistoryObject, user_id: string) => {
  const { played_at, track } = trackObj;
  const { name, uri, album } = track;

  const historyTrack = await HistoryTrack.findOne({where:{user_id: user_id, played_at: played_at, track_title: name}});
  if(historyTrack === undefined) {
    const artists: Array<string> = track.album.artists.map((artist: any) => {
      return artist.name;
    });

    track.played_at = played_at;

    const newTrack: HistoryTrack | undefined = new HistoryTrack();
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

const updateHistoryTrack = async (track: any, user_id: string) => {
  if(track) {
    const { name, played_at, features } = track;
    const { danceability, energy, loudness, acousticness, instrumentalness} = features
    const historyTrack: HistoryTrack | undefined = await HistoryTrack.findOne({where:{user_id: user_id, played_at: played_at, track_title: name}});
    if(historyTrack){
      historyTrack.danceability = danceability;
      historyTrack.energy = energy;
      historyTrack.loudness = loudness;
      historyTrack.acousticness = acousticness;
      historyTrack.instrumentalness = instrumentalness;
      await historyTrack.save();
      return track;
    }
    return track;
  }
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
          image_url: track.album.images[1].url,
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
  return tracks;
}

const createArtist = async(artistObj: any, user_id: string) => {
  const { artist_uri, artist_name, count, time_listened, is_explicit, image_url } = artistObj;
  let historyArtist: HistoryArtist | undefined = await HistoryArtist.findOne({where:{user_id: user_id, artist_name: artist_name}});
  if(historyArtist) {
    console.log(user_id);
    console.log(artist_name);
      await getConnection()
      .createQueryBuilder()
      .update(HistoryArtist)
      .set({
        count: () => `count + ${count}`, 
        time_listened: () => `time_listened + ${time_listened}`
      })
      .where("user_id = :user_id AND artist_name = :artist_name", {user_id: user_id, artist_name: artist_name})
      .execute();
  } else {
    let newArtist: HistoryArtist = new HistoryArtist();
    newArtist.artist_name = artist_name;
    newArtist.artist_uri = artist_uri;
    newArtist.user_id = user_id;
    newArtist.image_url = image_url;
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
  let genreArray: Array<Array<string>> = [];
  tracks.forEach((track) => {
    if(track){
      genreArray.push(track.artists[0].genres)
    }
  });
  const flatGenres: Array<string> = genreArray.flat();

  let genreObj: any = {};
  flatGenres.forEach((genre) => {
    if(genreObj.hasOwnProperty(genre)){
      genreObj[genre].count += 1;
    } else {
      const tempGenre = {
        genre: genre,
        count: 1
      }
      genreObj[genre] = tempGenre;
    }
  });
  const genres: Array<string> = Object.values(genreObj);

  try {
    Promise.all(genres.map(
      (genre) => {
       createGenre(genre, user_id);
      }
    ))
  } catch (err) {
    console.error('Error archiving genres!', err);
  };
}

const createGenre = async(genreObj: any, user_id: string) => {
  const { genre, count } = genreObj;
  let historyGenre: HistoryGenre | undefined = await HistoryGenre.findOne({where:{user_id: user_id, genre: genre}});
  if(historyGenre) {
    await getConnection()
      .createQueryBuilder()
      .update(HistoryGenre)
      .set({count: () => `count + ${count}`})
      .where("user_id = :user_id AND genre = :genre", {user_id: user_id, genre: genre})
      .execute();
  } else {
    let newGenre: HistoryGenre = new HistoryGenre();
    newGenre.genre = genre;
    newGenre.user_id = user_id;
    newGenre.count = count;
    await newGenre.save();
    return await getConnection()
      .createQueryBuilder()
      .relation(User, "historyGenres")
      .of(user_id)
      .add(newGenre);
  }
}

const getTrackFeature = async (track_uri: string, access_token: string) => {
  const track_id: string = track_uri.split(':')[2];
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