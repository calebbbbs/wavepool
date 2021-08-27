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
} from "@chakra-ui/react";

import { BsPerson } from "react-icons/bs";
import { BiHeadphone, BiAlbum } from "react-icons/bi";
import { MdQueueMusic } from "react-icons/md";
import AddToPlaylist from "./buttons/AddToPlaylist";
import PlayNow from "./buttons/PlayNow";
// import { useMutation } from "@apollo/client";

// import RECOMMEND_TRACK from "../../graphQL/mutations/RECOMMEND_TRACK";

const TrackComp = (props: any) => {
  // const [recommendTrack] = useMutation(RECOMMEND_TRACK);
  // const [sendInput, setSendInput] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);
  const { userObj, userPlaylists } = useContext(UserContext);
  const {
    friend_name,
    album_art,
    track_title,
    artists,
    album_title,
    spotify_uri,
  } = props.track;

  const bg = useColorModeValue("brand.50", "brand.900");

  const addToQueue = () => {
    axios
      .get(
        `/spotify/addToQueue/${userObj.user_id}/${spotify_uri}`
      )
      .then((data) => data)
      .catch((err) => console.error(err));
  };

  return (
    <chakra.div bg={bg} h="auto" borderRadius="2vh" m={2}>
      <Center>
        {friend_name && (
          <div>
            <Text m={4}>
              Recommended By <b> {friend_name}</b>
            </Text>
          </div>
        )}
      </Center>
      <Flex mx={5} p={4}>
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
          <Stack padding={2} borderRadius="15px" m={2} mr={4}>
            <Flex alignItems="center" minW="200px">
              <chakra.div mr={2}>
                <BiHeadphone />
              </chakra.div>
              <Text fontSize="md">{track_title}</Text>
            </Flex>
            <chakra.div>
              <Flex alignItems="center" minW="200px">
                <chakra.div mr={2}>
                  <BsPerson />
                </chakra.div>
                {artists.map((artist: any, i: number) => {
                  if (i === artists.length - 1) {
                    return (
                      <Text key={i} fontSize="md">
                        {artist}
                      </Text>
                    );
                  }
                  return (
                    <Text key={i} fontSize="md">
                      {artist},{"  "}
                    </Text>
                  );
                })}
              </Flex>
            </chakra.div>
            <Flex alignItems="center" minW="200px">
              <chakra.div mr={2}>
                <BiAlbum />
              </chakra.div>
              <Text fontSize="md">{album_title}</Text>
            </Flex>
            <hr></hr>
          </Stack>
        </Center>
        <Spacer />
        <Stack>
          <Tooltip placement="left" label="Add to Queue">
            <Button variant="ghost" onClick={addToQueue}>
              <MdQueueMusic />
            </Button>
          </Tooltip>
          <SendTrack track={props.track}/>
          {userPlaylists && (
            <AddToPlaylist playlists={userPlaylists} trackUri={spotify_uri} />
          )}
          <PlayNow user_id={userObj.user_id} spotify_uri={spotify_uri} />
        </Stack>
      </Flex>
    </chakra.div>
  );
};

export default TrackComp;
