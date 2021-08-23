import React, { useContext } from "react";
import {
  chakra,
  Center,
  Text,
  Image,
  Flex,
  Stack,
  Box,
  Button,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";

import { BiAlbum, BiHeadphone } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";

const RecommendedListItem = (props: any) => {
  const { track_title, album_title, spotify_uri, album_art, artists, friend_name } = props.track;
  const bg = useColorModeValue("brand.200", "brand.900");
  const { userObj } = useContext(UserContext);
  return (
    <chakra.div bg={bg} h="auto" borderRadius="2vh" m={2}>
              <Center>
        <Text
        m={4}
        >Recommended By {friend_name}</Text>
        </Center>
      <hr></hr>
      <Flex mx={5} p={4}>
        <Center>
            <Box>
          <Image
            aspect-ratio={1}
            m={2}
            minW='120px'
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
          <BiHeadphone /> - <Text fontSize="md">{track_title}</Text>
          </Flex>
            <chakra.div>
                <Flex>
            <BsPerson /> -
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
            <BiAlbum /> - <Text fontSize="md">{album_title}</Text>
            </Flex>
            <hr></hr>
          </Stack>
        </Center>
        <Spacer />
        <Stack m={4}>
          <Center>
            </Center>
            <Center>
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
            </Center>
        </Stack>
      </Flex>
    </chakra.div>
  );
};

export default RecommendedListItem;
