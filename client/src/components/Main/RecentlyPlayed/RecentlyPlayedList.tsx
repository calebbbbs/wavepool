import React from 'react'
import TrackComp from '../../Utils/Track/TrackComp';
import type {Track} from '../../../types'
const RecentlyPlayedList = (props: any) => {

const list = props.recentPlays.map((e: any, i: Number) => {
    const artists = e.artists.map((artist: any) => {
        return artist.name
    })
const track: Track = {
    album_art: e.album.images[1].url,
    track_title: e.name,
    artists: artists,
    album_title: e.album.name,
    spotify_uri: e.uri
}
    return  <TrackComp track={track} key={i}/>
  })
    return (
        <div>
            {list}
        </div>
    )
}

export default RecentlyPlayedList
