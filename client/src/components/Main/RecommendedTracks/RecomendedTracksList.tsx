import React from 'react'
import TrackInfo from '../../Utils/TrackInfo/TrackInfo'
const RecommendedTracksList = (props: any) => {
const list = props.recommendedTracks.map((e: any, i: Number) => {
    return  <TrackInfo track={e} key={i}/>
  })

    return (
        <div>
            {list}
        </div>
    )
}

export default RecommendedTracksList
