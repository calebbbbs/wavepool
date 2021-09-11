import React, { useContext } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { CgPlayTrackPrev, CgPlayTrackNext } from "react-icons/cg";
import { UserContext } from "../../../contexts/UserContext";
import { Flex, Button, ButtonGroup } from "@chakra-ui/react";
import axios from "axios";

export const TransportControls = () => {
  const { isPlaying, setIsPlaying, userObj, getUsersCurrentPlayback } =
    useContext(UserContext);

  return (
    <Flex>
      <ButtonGroup>
        <Button
          variant="ghost"
          onClick={async () => {
            //axios get previous
            await axios.get(`/spotify/prev/${userObj.user_id}`);
            await new Promise(resolve => setTimeout(resolve => {
              getUsersCurrentPlayback(userObj.user_id);
            }, 0));
          }}
        >
          <CgPlayTrackPrev />
        </Button>

        {isPlaying ? (
          <div>
            <Button
              variant="ghost"
              onClick={async () => {
                //axios get pause
                await axios.get(`/spotify/pause/${userObj.user_id}`);
                await setIsPlaying(false);
                await getUsersCurrentPlayback(userObj.user_id);
              }}
            >
              <FaPause />
            </Button>
          </div>
        ) : (
          <div>
            <Button
              variant="ghost"
              onClick={async () => {
                await axios.get(`/spotify/play/${userObj.user_id}`);
                await setIsPlaying(true);
                await getUsersCurrentPlayback(userObj.user_id);
              }}
            >
              <FaPlay />
            </Button>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={async () => {
            await axios.get(`/spotify/next/${userObj.user_id}`);
            await new Promise(resolve => setTimeout(resolve => {
              getUsersCurrentPlayback(userObj.user_id);
            }, 0));
          }}
        >
          <CgPlayTrackNext />
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
