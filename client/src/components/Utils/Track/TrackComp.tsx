import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../../contexts/UserContext';
import SendTrack from './buttons/SendTrack';
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
  SimpleGrid
} from '@chakra-ui/react';

import { BsPerson } from "react-icons/bs";
import { BiHeadphone, BiAlbum } from "react-icons/bi";
import { MdQueueMusic } from "react-icons/md";
import AddToPlaylist from "./buttons/AddToPlaylist";
import PlayNow from "./buttons/PlayNow";

const TrackComp = (props: any) => {

  const [imgLoaded, setImgLoaded] = useState(false);
  const { userObj, userPlaylists } = useContext(UserContext);
  const {
    album_art,
    track_title,
    artists,
    album_title,
    track_uri,
    user_id
  } = props.track;

  const list = artists.map((artist: any, i: number) => {
    if (i === artists.length - 1) {
      return (
        <Text key={i}>
          {artist}
        </Text>
      );
    }
    return (
      <Text key={i}>
        {artist},{'  '}
      </Text>
    );
  })

  const bg = useColorModeValue('brand.50', 'brand.900');
  const dividerColor = useColorModeValue('brand.900', 'brand.50');

  const addToQueue = () => {
    axios
      .get(`/spotify/addToQueue/${userObj.user_id}/${track_uri}`)
      .then((data) => data)
      .catch((err) => console.error(err));
  };

  return (
    <chakra.div bg={bg} h='auto' borderRadius='2vh' m={2}>
      <Flex mx={5} p={4}>
        <Center>
          <Box>
            <Skeleton isLoaded={imgLoaded}>
              <Image
                aspect-ratio={1}
                m={2}
                minW='120px'
                minH='120px'
                boxSize='120px'
                float='left'
                fit='contain'
                onLoad={() => {
                  setImgLoaded(true);
                }}
                src={album_art}
                alt='Album Cover'
              />
            </Skeleton>
          </Box>
        </Center>
        <Center>
        <Stack
                justifyContent="space-between"
                spacing={0}
                divider={<StackDivider borderColor={dividerColor} />}>
            <Flex alignItems='center' minW='200px'>
              <chakra.div mr={2}>
                <BiHeadphone/>
              </chakra.div>
              <Text>{track_title}</Text>
            </Flex>
            <chakra.div>
              <Flex alignItems='center'>
                <chakra.div mr={2}>
                  <BsPerson />
                </chakra.div>
                <SimpleGrid columns={2} spacingX="10px" spacingY="2px">
                {list}
                </SimpleGrid>
              </Flex>
            </chakra.div>
            <Flex alignItems='center' minW='200px'>
              <chakra.div mr={2}>
                <BiAlbum />
              </chakra.div>
              <Text>{album_title}</Text>
            </Flex>
          </Stack>
        </Center>
        <Spacer />
        <Stack>
          <Tooltip placement='left' label='Add to Queue'>
            <Button variant='ghost' onClick={addToQueue}>
              <MdQueueMusic />
            </Button>
          </Tooltip>
          <SendTrack track={props.track} />
          {userPlaylists && (
            <AddToPlaylist user_id={user_id} playlists={userPlaylists} trackUri={track_uri} />
          )}
          <PlayNow user_id={userObj.user_id} friend_id={user_id} track_uri={track_uri} />
        </Stack>
      </Flex>
    </chakra.div>
  );
};

export default TrackComp;
