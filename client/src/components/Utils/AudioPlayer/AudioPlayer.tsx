import React, { useContext, useEffect } from "react";
// import { BsMusicNoteBeamed } from 'react-icons/bs'
import { UserContext } from "../../../contexts/UserContext";
import {
  chakra,
  HStack,
  Image,
  Stack,
  Center,
  StackDivider,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

import { TransportControls } from "./TransportControls";
import {usePalette} from 'react-palette'
import { BsPerson } from "react-icons/bs";
import { BiHeadphone, BiAlbum } from "react-icons/bi";

export const AudioPlayer = (props: any) => {
  const bg = useColorModeValue("brand.900", "brand.50")
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { userObj, currPlayback, getUsersCurrentPlayback } =
    useContext(UserContext);
  useEffect(() => {
    const interval = setInterval(() => {
      getUsersCurrentPlayback(userObj.user_id);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const {data, error} = usePalette(currPlayback.item.album.images[2].url);
useEffect(() => {
if(data && !error){
  console.log(data);
  const colors = {
    50: data.lightVibrant,
    100: data.lightMuted,
    200: data.muted,
    500: data.vibrant,
    600: data.muted,
    700: data.vibrant,
    800: data.darkVibrant,
    900: data.darkMuted
  }
  props.changeColorTheme(colors);
}
}, [data])
  return (
    <>
            <Center>
              <HStack
               display={{ base: "none", md: "inline-flex" }}
              alignContent="center"
              alignItems="center"
              float="right">
                <Center>
                  <Image
                    borderRadius="5px"
                    m={4}
                    boxSize="64px"
                    objectFit="cover"
                    src={currPlayback.item.album.images[2].url}
                  />
                </Center>
                <Stack 
                justifyContent="space-between"
                spacing={0}
                divider={<StackDivider borderColor={bg} />}>
                  <Flex alignItems="center">
                    {/* <chakra.div mr={4}> */}
                    <BiHeadphone />
                    {/* </chakra.div> */}
                    <chakra.p > {currPlayback.item.name}</ chakra.p>
                  </Flex>
                  <Flex alignItems="center">
                    {/* <chakra.div mr={4}> */}
                      <BsPerson/>
                      {/* </chakra.div> */}
                    <chakra.div >
                      {currPlayback.item.artists.map(
                        (artist: any, i: number) => {
                          if (i === currPlayback.item.artists.length - 1) {
                            return (
                              <chakra.p key={i}>{artist.name}</chakra.p>
                            );
                          }
                          return (
                            <chakra.p key={i}>{artist.name}, </chakra.p>
                          );
                        }
                      )}
                    </chakra.div>
                  </Flex>
                  <Flex alignItems="center">
                    {/* <chakra.div mr={4}> */}
                      <BiAlbum/>
                      {/* </chakra.div> */}
                    <chakra.p >
                      {currPlayback.item.album.name}
                    </chakra.p>
                  </Flex>
                </Stack>
                  <TransportControls />
              </HStack>
              </Center>
    </>
  );
};

export default AudioPlayer;
