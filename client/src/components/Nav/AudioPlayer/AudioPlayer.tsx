import React, { useContext} from "react";

import { UserContext } from "../../../contexts/UserContext";
import { chakra, Flex, Image, Text, Stack, Center } from "@chakra-ui/react";

import { TransportControls } from "./TransportControls";
export const AudioPlayer = () => {
  const { currPlayback } = useContext(UserContext);

  return (
    <Flex m={4}
    float="right"
    fontSize="xs">
      <Center>
      <Image
        borderRadius="5px"
        m={4}
        boxSize="100px"
        objectFit="cover"
        src={currPlayback.item.album.images[2].url}
      />
      </Center>
      <Stack>
        <Text fontSize="xs">Track: {currPlayback.item.name}</Text>
        <Text fontSize="xs">Album: {currPlayback.item.album.name}</Text>
        <chakra.div fontSize="xs">
          Artist: {
            currPlayback.item.artists.map((artist: any, i:number) => {
              if(i === currPlayback.item.artists.length - 1){
                return <chakra.span fontSize="xs" key={i}>{artist.name}</chakra.span>
              }
              return <chakra.span fontSize="xs" key={i} >{artist.name}, </chakra.span>
            }
            )}
        </chakra.div>
            <TransportControls/>
      </Stack>
    </Flex>
  );
};

export default AudioPlayer;
