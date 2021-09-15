import React, { useContext, useState} from "react";
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
  useToast
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
  const toast = useToast();

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
      .then((data) => { toast({
        title: `Song added to queue!`,
        position: "top-left",
        status: "info",
        isClosable: true,
      })
      return data;
    })
      .catch((error) => console.log('Error addToQueue in TrackComp.tsx', error));
    };

  return (
    <chakra.div bg={bg} h="auto" borderRadius="2vh"
    m={2}>
      <Flex p={4} flexDirection={{base: "column", md: 'row'}}>
        <Center>
          <Box>
            <Skeleton isLoaded={imgLoaded}>
              <Image
                aspect-ratio={1}
                m={2}
                minW={{base: '150px', md: '64px'}}
                minH={{base: '150px', md: '64px'}}
                boxSize={{base: '150px', md: '64px'}}
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
            divider={<StackDivider borderColor={dividerColor} />}
            borderRadius="15px"
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
                <chakra.div>
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
        <Center>
        <Flex
        flexDirection={{base: "row", md: 'column'}}>
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
        </Flex>
        </Center>
      </Flex>
    </chakra.div>
  );
};

export default TrackComp;
