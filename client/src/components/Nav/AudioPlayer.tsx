import React, {useContext} from 'react';

import { UserContext } from '../../contexts/UserContext';



export const AudioPlayer = () => {
const {currPlayback} = useContext(UserContext)
  return (
    <div>
         {/* Artist: {currPlayback.item.artists.map((artist: any, i: number) => {
           return (<span key={i}>artist.name</span>)
         })}
         Track: {currPlayback.item.name} */}
        {currPlayback &&
         <span>this is the audio player</span>
        }
    </div>
  )
}

export default AudioPlayer
