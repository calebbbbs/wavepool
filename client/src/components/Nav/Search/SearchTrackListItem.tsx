import React, { useContext, useState } from "react";
import {
  chakra,
  Center,
  Text,
  Image,
  Stack,
  Button,
  Spacer,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Input,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { UserContext } from "../../../contexts/UserContext";
import { useMutation, gql } from "@apollo/client";
import axios from "axios";

const RECOMMEND_TRACK = gql`
  mutation CreateRecommendedMutation(
    $createRecommendedData: CreateRecommendedInput!
  ) {
    createRecommended(data: $createRecommendedData) {
      user_id
      friend_id
      track_title
      artists
      spotify_uri
      album_title
      album_art
    }
  }
`;

const SearchTrackListItem = (props: any) => {
  const { name, artists, album } = props.track;
  const bg = useColorModeValue("gray.200", "gray.900");
  const [reccomendTrack] = useMutation(RECOMMEND_TRACK);
  const [sendInput, setSendInput] = useState("");
  const { userObj, getUsersPlaylists, spotifyApi } = useContext(UserContext);
  const { onOpen, onClose } = useDisclosure()
  return (
    <chakra.div bg={bg} h="auto" borderRadius="2vh" m={2}>
      <hr></hr>
      <Stack mx={5} p={4}>
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
                  onClose()
                }}
              >
                Send
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Button
          onClick={() => {
            const params = {
                access_token: userObj.access_token,
                uri: props.track.uri
            }
            axios(`http://localhost:4000/addToQueue/${userObj.access_token}/${props.track.uri}`, {params}).then((data) =>
            console.log(data)).catch((err) => console.error(err));
        }}>
            Queue
        </Button>
        <Button onClick={() => {
            spotifyApi.setAccessToken(userObj.access_token);
            getUsersPlaylists(userObj.access_token);

        }}
        colorScheme="teal"
        float="right"
        placeholder="add to playlist">Add
        </Button>
        </Stack>
        </chakra.div>)
}

export default SearchTrackListItem
