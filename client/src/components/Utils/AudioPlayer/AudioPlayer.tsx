import React, { useContext, useEffect } from "react";
// import { BsMusicNoteBeamed } from 'react-icons/bs'
import { UserContext } from "../../../contexts/UserContext";
import {
  chakra,
  HStack,
  Image,
  // Text,
  Stack,
  Center,
  Flex

} from "@chakra-ui/react";

import { TransportControls } from "./TransportControls";

import { BsPerson } from "react-icons/bs";
import { BiHeadphone, BiAlbum } from "react-icons/bi";

export const AudioPlayer = () => {
  // const bg = useColorModeValue("brand.50", "brand.900")
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { userObj, currPlayback, getUsersCurrentPlayback } =
    useContext(UserContext);
  useEffect(() => {
    const interval = setInterval(() => {
      getUsersCurrentPlayback(userObj.user_id);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
                <Stack>
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
                              <chakra.span key={i}>{artist.name}</chakra.span>
                            );
                          }
                          return (
                            <chakra.span key={i}>{artist.name}, </chakra.span>
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
