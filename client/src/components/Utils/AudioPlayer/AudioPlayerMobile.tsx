import React, { useContext, useEffect } from "react";
// import { BsMusicNoteBeamed } from 'react-icons/bs'
import { UserContext } from "../../../contexts/UserContext";
import {
  chakra,
  VStack,
  Image,
  Text,
  Stack,
  Center,
  Drawer,
  Flex,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Button,
  DrawerCloseButton,
  useDisclosure,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";

import { BsPerson } from "react-icons/bs";
import { BiHeadphone, BiAlbum } from "react-icons/bi";

import { TransportControls } from "./TransportControls";

import { BsMusicNoteBeamed } from "react-icons/bs";

export const AudioPlayerMobile = () => {
  const bg = useColorModeValue("brand.50", "brand.900");
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <Tooltip label="Spotify Controls">
        <Button
          display={{ base: "inline-flex", md: "none" }}
          m={4}
          variant="ghost"
          onClick={onOpen}
        >
          <BsMusicNoteBeamed />
        </Button>
      </Tooltip>
      <Drawer size="xs" isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton />
          <DrawerBody>
            <Center>
              <VStack
                alignContent="center"
                alignItems="center"
                my="auto"
                float="right"
                fontSize="xs"
              >
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
                    <BiHeadphone />
                    <Text fontSize="xl"> {currPlayback.item.name}</Text>
                  </Flex>
                  <Flex alignItems="center">
                      <BsPerson/>
                    <chakra.div fontSize="xl">
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
                      <BiAlbum/>
                    <Text fontSize="xl">
                     {currPlayback.item.album.name}
                    </Text>
                  </Flex>
                </Stack>
                <TransportControls />
              </VStack>
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AudioPlayerMobile;
