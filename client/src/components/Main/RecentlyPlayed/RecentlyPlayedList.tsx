import React from 'react'
import RecentlyPlayedListItem from './RecentlyPlayedListItem';
const RecentlyPlayedList = (props: any) => {
const list = props.recentPlays.map((e: any, i: Number) => {
    return  <RecentlyPlayedListItem track={e} key={i}/>
  })
    return (
        <div>
            {list}
        </div>
    )
}

export default RecentlyPlayedList
