import React, { useContext } from "react";
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
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

import { BsPerson } from "react-icons/bs";
import { BiHeadphone, BiAlbum } from "react-icons/bi";

// import { useMutation } from "@apollo/client";

// import RECOMMEND_TRACK from "../../graphQL/mutations/RECOMMEND_TRACK";

const TrackInfo = (props: any) => {
  // const [reccomendTrack] = useMutation(RECOMMEND_TRACK);
  // const [sendInput, setSendInput] = useState("");

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
        <Stack>
          <Button
            onClick={() => {
              axios
                .get(
                  `http://localhost:4000/spotify/addToQueue/${userObj.user_id}/${spotify_uri}`
                )
                .then((data) => console.log(data))
                .catch((err) => console.error(err));
            }}
          >
            Queue
          </Button>

          <Popover>
            <PopoverTrigger>
              <Button>Send</Button>
            </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight="semibold">
                  Confirmation
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  Are you sure you want to send this track?
                  <Center>
                    <Button colorScheme="green">Yeah!</Button>
                  </Center>
                </PopoverBody>
              </PopoverContent>
          </Popover>
        </Stack>
      </Flex>
    </chakra.div>
  );
};

export default TrackInfo;
