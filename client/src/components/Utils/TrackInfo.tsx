import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Input,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { BsPerson } from "react-icons/bs";
import { BiHeadphone, BiAlbum } from "react-icons/bi";

import { useMutation } from "@apollo/client";

import RECOMMEND_TRACK from "../../graphQL/mutations/RECOMMEND_TRACK";

const TrackInfo = (props: any) => {
  const [reccomendTrack] = useMutation(RECOMMEND_TRACK);
  const [sendInput, setSendInput] = useState("");
  const { onOpen, onClose } = useDisclosure();
  const { userObj } = useContext(UserContext);
  const {
    friend_name,
    album_art,
    track_title,
    artists,
    album_title,
    spotify_uri,
  } = props.track;
  const bg = useColorModeValue("brand.100", "brand.900");
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
            <Image
              aspect-ratio={1}
              m={2}
              minW="120px"
              minH="120px"
              boxSize="120px"
              float="left"
              fit="contain"
              src={album_art}
              alt="Album Cover"
            />
          </Box>
        </Center>
        <Center>
          <Stack ml={2} mr="auto">
            <Flex>
              <chakra.div mr={2}>
                <BiHeadphone />
              </chakra.div>
              <Text fontSize="md">{track_title}</Text>
            </Flex>
            <chakra.div>
              <Flex>
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
                      {artist},{" "}
                    </Text>
                  );
                })}
              </Flex>
            </chakra.div>
            <Flex>
              <chakra.div mr={2}>
                {" "}
                <BiAlbum />
              </chakra.div>
              <Text fontSize="md">{album_title}</Text>
            </Flex>
            <hr></hr>
          </Stack>
        </Center>
        <Spacer />
        <Stack m={4}>
            <Button
              onClick={() => {
                const params = {
                  access_token: userObj.access_token,
                  uri: props.track.uri,
                };
                axios(
                  `http://localhost:4000/addToQueue/${userObj.access_token}/${spotify_uri}`,
                  { params }
                )
                  .then((data) => data)
                  .catch((err) => console.error(err));
              }}
            >
              Queue
            </Button>
            <Popover>
              <PopoverTrigger>
                <Button onClick={onOpen}>Send</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Recipients Email</PopoverHeader>
                <PopoverBody>
                  <Input onChange={(e) => setSendInput(e.target.value)} />
                  <Button
                    onClick={() => {
                      reccomendTrack({
                        variables: {
                          createRecommendedData: {
                            user_id: userObj.user_id,
                            friend_id: sendInput,
                            track_title: name,
                            spotify_uri: props.track.uri,
                            artists: [props.track.artists[0].name],
                            album_title: props.track.album.name,
                            album_art: props.track.album.images[1].url,
                          },
                        },
                      });
                      onClose();
                    }}
                  >
                    Send
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
        </Stack>
      </Flex>
    </chakra.div>
  );
};

export default TrackInfo;
