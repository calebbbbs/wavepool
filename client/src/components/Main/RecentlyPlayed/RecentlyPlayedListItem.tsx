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
  Popover,
  PopoverTrigger,
  Input,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";

import { BiAlbum, BiHeadphone } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";

const RecentlyPlayedListItem = (props: any) => {
  const { name, artists, album } = props.track;
  const bg = useColorModeValue("brand.200", "brand.900");
  const { userObj } = useContext(UserContext);
  return (
    <chakra.div bg={bg} h="auto" borderRadius="2vh" m={2}>
      <Flex mx={5} p={4}>
        <Center>
          <Image
            aspect-ratio={1}
            m={2}
            boxSize="120px"
            minW="120px"
            minH="120px"
            float="left"
            src={album.images[1].url}
            alt="Album Cover"
          />
        </Center>
        <Center>
          <Stack ml={2} mr="auto">
            <Flex>
              <BiHeadphone/> <Text fontSize="md">{name}</Text>
            </Flex>
            <Flex>
              <BsPerson /> -
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
            </Flex>
            <Flex>
              <BiAlbum /> -<Text fontSize="md">{album.name}</Text>
            </Flex>
            <hr></hr>
          </Stack>
        </Center>
        <Spacer />
        <Stack m={4}>
          <Center>
            <Popover>
              <PopoverTrigger>
                <Button>Send</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Recipients Email</PopoverHeader>
                <PopoverBody>
                  <Input />
                  <Button onClick={() => {}}>Send</Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
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

export default RecentlyPlayedListItem;
