import React, { useContext } from "react";
import {
  chakra,
  Center,
  Text,
  Image,
  Flex,
  Stack,
  Button,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";

const RecentlyPlayedListItem = (props: any) => {
  const { name, artists, album } = props.track;
  const bg = useColorModeValue("gray.200", "gray.900");
  const { userObj } = useContext(UserContext);
  return (
    <chakra.div bg={bg} h="auto" borderRadius="2vh" m={2}>
      <hr></hr>
      <Flex mx={5} p={4}>
        <Center>
          <Image
            aspect-ratio={1}
            m={2}
            w="120px"
            h="120px"
            float="left"
            src={album.images[1].url}
            alt="Album Cover"
          />
        </Center>
        <Center>
          <Stack ml={2} mr="auto">
            <Text fontSize="md">{name}</Text>
            <chakra.div fontSize="md">
              {artists.map((artist: any, i: number) => {
                if (i === artists.length - 1) {
                  return (
                    <Text key={i} fontSize="md">
                      {artist.name}
                    </Text>
                  );
                }
                return (
                  <Text key={i} fontSize="md">
                    {artist.name},{" "}
                  </Text>
                );
              })}
            </chakra.div>
            <Text fontSize="md">{album.name}</Text>
            <hr></hr>
          </Stack>
        </Center>
        <Spacer />
        <Stack m={4}>
          <Center>
            <Button
              colorScheme="green"
              float="right"
              placeholder="send to friends"
            >
              Send
            </Button>
            </Center>
            <Center>
            <Button
              onClick={() => {
                const params = {
                  access_token: userObj.access_token,
                  uri: props.track.uri,
                };
                axios(
                  `http://localhost:4000/addToQueue/${userObj.access_token}/${props.track.uri}`,
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

export default RecentlyPlayedListItem;
