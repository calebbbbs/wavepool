import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../contexts/UserContext";
import SendTrack from "./buttons/SendTrack";
import {
  chakra,
  Center,
  Text,
  Flex,
  Box,
  Stack,
  Image,
  Spacer,
  Button,
  useColorModeValue,
  Tooltip,
  Skeleton,
  StackDivider,
} from "@chakra-ui/react";

import Marquee from "react-fast-marquee";
import { BsPerson } from "react-icons/bs";
import { BiHeadphone, BiAlbum } from "react-icons/bi";
import { MdQueueMusic } from "react-icons/md";
import AddToPlaylist from "./buttons/AddToPlaylist";
import PlayNow from "./buttons/PlayNow";

const TrackComp = (props: any) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { userObj, userPlaylists } = useContext(UserContext);
  const { album_art, track_title, artists, album_title, track_uri, user_id } =
    props.track;

  const bg = useColorModeValue("brand.50", "brand.900");
  const dividerColor = useColorModeValue("brand.900", "brand.50");

  let str = "";
  artists.map((artist: any, i: number) => {
    if (i === artists.length - 1) {
      return (str += `  ${artist}  `);
    }
    return (str += `  ${artist},  `);
  });

  const addToQueue = () => {
    axios
      .get(`/spotify/addToQueue/${userObj.user_id}/${track_uri}`)
      .then((data) => data)
      .catch((err) => console.error(err));
  };

  return (
    <chakra.div bg={bg} h="auto" borderRadius="2vh"
    m={2}>
    <Text m={2}>{props.idx}</Text>
      <Flex p={4}>
        <Center>
          <Box>
            <Skeleton isLoaded={imgLoaded}>
              <Image
                aspect-ratio={1}
                m={2}
                minW="120px"
                minH="120px"
                boxSize="120px"
                float="left"
                fit="contain"
                onLoad={() => {
                  setImgLoaded(true);
                }}
                src={album_art}
                alt="Album Cover"
              />
            </Skeleton>
          </Box>
        </Center>
        <Center>
          <Stack
          maxW='175px'
            divider={<StackDivider borderColor={dividerColor} />}
            borderRadius="15px"
            // m={2}
            // mr={4}
          >
            <Flex alignItems="center">
              <BiHeadphone />
              <Text>{track_title}</Text>
            </Flex>
            <chakra.div>
              <Flex alignItems="center">
                <chakra.div minW="10px">
                <BsPerson />
                </chakra.div>
                <chakra.div maxW='150px'>
                  <Marquee
                  
                    gradient={false}
                    pauseOnHover={true}
                    pauseOnClick={true}
                  >
                    {str}
                  </Marquee>
                </chakra.div>
              </Flex>
            </chakra.div>
            <Flex alignItems="center">
              <BiAlbum />
              <Text>{album_title}</Text>
            </Flex>
          </Stack>
        </Center>
        <Spacer />
        <Stack>
          <Tooltip placement="left" label="Add to Queue">
            <Button variant="ghost" onClick={addToQueue}>
              <MdQueueMusic />
            </Button>
          </Tooltip>
          <SendTrack track={props.track} />
          {userPlaylists && (
            <AddToPlaylist
              user_id={user_id}
              playlists={userPlaylists}
              trackUri={track_uri}
            />
          )}
          <PlayNow
            user_id={userObj.user_id}
            friend_id={user_id}
            track_uri={track_uri}
          />
        </Stack>
      </Flex>
    </chakra.div>
  );
};

export default TrackComp;
