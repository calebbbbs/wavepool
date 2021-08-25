import React, { useContext } from "react";
import {
  chakra,
  Center,
  Text,
  Flex,
  Stack,
  Button,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { UserContext } from "../../../contexts/UserContext";
// import axios from "axios";

const UserPlaylistItem = (props: any) => {
  // const { name, artists, album } = props.track;
  const bg = useColorModeValue("gray.200", "gray.900");
  const { userPlaylists } = useContext(UserContext);
  return (
    <chakra.div bg={bg} h="auto" borderRadius="2vh" m={2}>
      <Flex mx={5} p={4}>
        {/* <Center>
          {/* <Image
            aspect-ratio={1}
            m={2}
            w="120px"
            h="120px"
            float="left"
            // src={album.images[1].url}
          /> */}
        {/* </Center> */}
        <Center>
          <Stack ml={2} mr="auto">
            {/* <Text fontSize="md">{name}</Text> */}
            <chakra.div fontSize="md">
              {userPlaylists.map((playlist: any, i: number) => {
                if (i === playlist.length - 1) {
                  return (
                    <Text key={i} fontSize="md">
                      {playlist.name}
                    </Text>
                  );
                }
                return (
                  <Text key={i} fontSize="md">
                    {playlist.name}{" "}
                  </Text>
                );
              })}
            </chakra.div>
            <Text fontSize="md">{userPlaylists.name}</Text>
            {/* <hr></hr> */}
          </Stack>
        </Center>
        <Spacer />
        <Stack m={4}>
          <Center>
            <Button
              // colorScheme="teal"
              float="right"
              placeholder="send to friends"
            >
              Add
            </Button>
            </Center>
            <Center>
            {/* <Button
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
            </Button> */}
            </Center>
        </Stack>
      </Flex>
    </chakra.div>
  );
};

export default UserPlaylistItem;
