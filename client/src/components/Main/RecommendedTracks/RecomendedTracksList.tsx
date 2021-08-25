import React from 'react'
import TrackComp from '../../Utils/Track/TrackComp'
const RecommendedTracksList = (props: any) => {
const list = props.recommendedTracks.map((e: any, i: Number) => {
    return  <TrackComp track={e} key={i}/>
  })

    return (
        <div>
            {list}
        </div>
    )
}

export default RecommendedTracksList
