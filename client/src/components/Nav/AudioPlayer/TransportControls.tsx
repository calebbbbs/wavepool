import React, {useContext} from 'react'

import { UserContext } from '../../../contexts/UserContext';
import { Flex, Button, ButtonGroup } from '@chakra-ui/react';

export const TransportControls = () => {
    const { isPlaying, setIsPlaying, spotifyApi, userObj, getUsersCurrentPlayback } = useContext(UserContext);
    

    return (
        <Flex>
            <ButtonGroup>
                    <Button
          onClick={() => {
            spotifyApi.setAccessToken(userObj.access_token);
            spotifyApi.skipToPrevious()

            setTimeout(() => {getUsersCurrentPlayback(userObj.access_token)}, 1000)

          }}
        >
          Prev
        </Button>

        {isPlaying ? (
          <div>
            <Button
              onClick={() => {
                spotifyApi.setAccessToken(userObj.access_token);
                spotifyApi.pause();
                setIsPlaying(false);
                getUsersCurrentPlayback(userObj.access_token)
              }}
            >
              Pause
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => {
                spotifyApi.setAccessToken(userObj.access_token);
                spotifyApi.play();
                setIsPlaying(true);
                getUsersCurrentPlayback(userObj.access_token)
              }}
            >
              Play
            </Button>
          </div>
        )}
        <Button
          onClick={() => {
            spotifyApi.setAccessToken(userObj.access_token);
            spotifyApi.skipToNext()

            setTimeout(() => {getUsersCurrentPlayback(userObj.access_token)}, 1000)
          }}
        >
          Next
        </Button>
        </ButtonGroup>
      </Flex>
    )
}
