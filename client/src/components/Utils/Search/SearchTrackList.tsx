import React from 'react';
import TrackComp from '../Track/TrackComp';
import type { Track } from '../../../types';
import { chakra } from '@chakra-ui/react';

const SearchTrackList = (props: any) => {
  const list = props.trackList.map((e: any, i: Number) => {
    const artists = e.artists.map((artist: any) => {
      return artist.name;
    });

    const track: Track = {
      album_art: e.album.images[1].url,
      track_title: e.name,
      artists: artists,
      album_title: e.album.name,
      spotify_uri: e.uri,
    };

    return <TrackComp track={track} key={i} />;
  });

  return <chakra.div>{list}</chakra.div>;
};

export default SearchTrackList;
