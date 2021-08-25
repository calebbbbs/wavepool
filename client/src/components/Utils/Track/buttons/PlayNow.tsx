import React from 'react'
import axios from 'axios'

import { Button, Tooltip} from '@chakra-ui/react'

import { BiPlay } from 'react-icons/bi'

const playNow = (user_id: string, spotify_uri: string) => {
    axios.get(`/spotify/playNow/${user_id}/${spotify_uri}`).then((data) => {
        console.log(data);
    })
}


const PlayNow = (props: any) => {
    return (
        <Tooltip placement="left" label="Play Now">
        <Button variant="ghost" onClick={() => {
            playNow(props.user_id, props.spotify_uri);
        }}>
            <BiPlay/>
        </Button>
        </Tooltip>
    )
}

export default PlayNow
