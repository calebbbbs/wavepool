import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../contexts/UserContext';
import ConfirmPopper from './ConfirmPopper';
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
} from '@chakra-ui/react';

import { BsPerson } from 'react-icons/bs';
import { BiHeadphone, BiAlbum } from 'react-icons/bi';
import { MdQueueMusic } from 'react-icons/md';
import AddToPlaylist from './AddToPlaylist';

// import { useMutation } from "@apollo/client";

// import RECOMMEND_TRACK from "../../graphQL/mutations/RECOMMEND_TRACK";

const TrackInfo = (props: any) => {
  // const [reccomendTrack] = useMutation(RECOMMEND_TRACK);
  // const [sendInput, setSendInput] = useState("");
  const { userObj, userPlaylists } = useContext(UserContext);
  const {
    friend_name,
    album_art,
    track_title,
    artists,
    album_title,
    spotify_uri,
  } = props.track;
  const bg = useColorModeValue('brand.100', 'brand.800');

 const addToPlaylist = () => {
  axios
    .get(
      `http://localhost:4000/spotify/addToQueue/${userObj.user_id}/${spotify_uri}`
    )
    .then((data) => data)
    .catch((err) => console.error(err));
}

  return (
    <chakra.div bg={bg} h='auto' borderRadius='2vh' m={2}>
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
            <Image
              aspect-ratio={1}
              m={2}
              minW='120px'
              minH='120px'
              boxSize='120px'
              float='left'
              fit='contain'
              src={album_art}
              alt='Album Cover'
            />
          </Box>
        </Center>
        <Center>
          <Stack m={3} mr={4}>
            <Flex minW='200px'>
              <chakra.div mr={2}>
                <BiHeadphone />
              </chakra.div>
              <Text fontSize='md'>{track_title}</Text>
            </Flex>
            <chakra.div>
              <Flex minW='200px'>
                <chakra.div mr={2}>
                  <BsPerson />
                </chakra.div>
                {artists.map((artist: any, i: number) => {
                  if (i === artists.length - 1) {
                    return (
                      <Text key={i} fontSize='md'>
                        {artist}
                      </Text>
                    );
                  }
                  return (
                    <Text key={i} fontSize='md'>
                      {artist},{'  '}
                    </Text>
                  );
                })}
              </Flex>
            </chakra.div>
            <Flex minW='200px'>
              <chakra.div mr={2}>
                {' '}
                <BiAlbum />
              </chakra.div>
              <Text fontSize='md'>{album_title}</Text>
            </Flex>
            <hr></hr>
          </Stack>
        </Center>
        <Spacer />
        <Stack>
          <Tooltip placement='top' label='Add to Queue'>
            <Button
              variant='ghost'
              onClick={addToPlaylist}
            >
              <MdQueueMusic />
            </Button>
          </Tooltip>
          <ConfirmPopper />
          {userPlaylists && (
            <AddToPlaylist playlists={userPlaylists} trackUri={spotify_uri} />
          )}
        </Stack>
      </Flex>
    </chakra.div>
  );
};

export default TrackInfo;
