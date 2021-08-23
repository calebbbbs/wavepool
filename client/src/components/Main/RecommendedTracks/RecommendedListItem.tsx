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

const RecommendedListItem = (props: any) => {
  const { track_title, album_title, spotify_uri, album_art, artists, friend_id } = props.track;
  console.log(props);
  const bg = useColorModeValue("gray.200", "gray.900");
  const { userObj } = useContext(UserContext);
  return (
    <chakra.div bg={bg} h="auto" borderRadius="2vh" m={2}>
              <Center>
        <Text
        m={4}
        >Recommended By {friend_id}</Text>
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
            <Text fontSize="md">{track_title}</Text>
            <chakra.div>
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
            </chakra.div>
            <Text fontSize="md">{album_title}</Text>
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
                  .then((data) => console.log(data))
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
