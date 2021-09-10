import React, { useContext } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { CgPlayTrackPrev, CgPlayTrackNext } from "react-icons/cg";
import { UserContext } from "../../../contexts/UserContext";
import { Flex, Button, ButtonGroup, Tooltip } from "@chakra-ui/react";
import axios from "axios";

export const TransportControls = () => {
  const { isPlaying, setIsPlaying, userObj, getUsersCurrentPlayback } =
    useContext(UserContext);

  return (
    <Flex>
      <ButtonGroup>
        <Tooltip label="Previous Track" placement="bottom">
        <Button
          variant="ghost"
          onClick={() => {
            //axios get previous
            axios.get(`/spotify/prev/${userObj.user_id}`);
            setTimeout(() => {
              getUsersCurrentPlayback(userObj.user_id);
            }, 1000);
          }}
        >
          <CgPlayTrackPrev />
        </Button>
          </Tooltip>
        {isPlaying ? (
          <div>
            <Tooltip label="Pause Track">
            <Button
              variant="ghost"
              onClick={() => {
                //axios get pause
                axios.get(`/spotify/pause/${userObj.user_id}`);
                setIsPlaying(false);
                getUsersCurrentPlayback(userObj.user_id);
              }}
            >
              <FaPause />
            </Button>
            </Tooltip>
          </div>
        ) : (
          <div>
            <Tooltip label="Play Track" placement="bottom">
            <Button
              variant="ghost"
              onClick={() => {
                axios.get(`/spotify/play/${userObj.user_id}`);
                setIsPlaying(true);
                getUsersCurrentPlayback(userObj.user_id);
              }}
            >
              <FaPlay />
            </Button>
            </Tooltip>
          </div>
        )}
                <Tooltip label="Next Track" placement="bottom">
        <Button
          variant="ghost"
          onClick={() => {
            axios.get(`/spotify/next/${userObj.user_id}`);

            setTimeout(() => {
              getUsersCurrentPlayback(userObj.user_id);
            }, 1000);
          }}
        >
          <CgPlayTrackNext />
        </Button>
        </Tooltip>
      </ButtonGroup>
    </Flex>
  );
};
