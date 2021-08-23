import React from 'react'
import RecommendedListItem from './RecommendedListItem'

const RecommendedTracksList = (props: any) => {
const list = props.recommendedTracks.map((e: any, i: Number) => {
    return  <RecommendedListItem track={e} key={i}/>
  })

    return (
        <div>
            {list}
        </div>
    )
}

export default RecommendedTracksList
