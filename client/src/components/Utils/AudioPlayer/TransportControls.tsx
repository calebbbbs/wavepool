import React, {useContext} from 'react'
import { FaPlay, FaPause } from 'react-icons/fa';
import { CgPlayTrackPrev, CgPlayTrackNext } from 'react-icons/cg';
import { UserContext } from '../../../contexts/UserContext';
import { Flex, Button, ButtonGroup } from '@chakra-ui/react';
import axios from 'axios';

export const TransportControls = () => {
    const { isPlaying, setIsPlaying,  userObj, getUsersCurrentPlayback } = useContext(UserContext);


    return (
        <Flex>
            <ButtonGroup>
                    <Button
          onClick={() => {
            //axios get previous
            axios.get(`/spotify/prev/${userObj.user_id}`)
            setTimeout(() => {getUsersCurrentPlayback(userObj.user_id)}, 1000)

          }}
        >
          <CgPlayTrackPrev/>
        </Button>

        {isPlaying ? (
          <div>
            <Button
              onClick={() => {
                //axios get pause
                axios.get(`/spotify/pause/${userObj.user_id}`)
                setIsPlaying(false);
                getUsersCurrentPlayback(userObj.user_id)
              }}
            >
                 <FaPause />
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => {
               //axios get play
               axios.get(`/spotify/play/${userObj.user_id}`)
                setIsPlaying(true);
                getUsersCurrentPlayback(userObj.user_id)
              }}
            >
              <FaPlay />
            </Button>
          </div>
        )}
        <Button
          onClick={() => {
            axios.get(`/spotify/next/${userObj.user_id}`)

            setTimeout(() => {getUsersCurrentPlayback(userObj.user_id)}, 1000)
          }}
        >
          <CgPlayTrackNext/>
        </Button>
        </ButtonGroup>
      </Flex>
    )
}
