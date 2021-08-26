import React from 'react'
import UserPlaylistItem from './UserPlaylistItem'
const UserPlaylistContainer = (props: any) => {

const list = props.userPlaylists.map((e: any, i: Number) => {
    return  <UserPlaylistItem track={e} key={i}/>
  })
    return (
        <div>
            {list}
        </div>
    )
}

export default UserPlaylistContainer