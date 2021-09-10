import React, { useContext, useEffect } from "react";
// import { BsMusicNoteBeamed } from 'react-icons/bs'
import { UserContext } from "../../../contexts/UserContext";
import {
  chakra,
  HStack,
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
        <Button
          display={{ base:"inline-flex", md: "none" }}
          variant="ghost"
          onClick={onOpen}
        >
          <BsMusicNoteBeamed/>Audio Controls
        </Button>
      <Drawer size="xs" isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton />
          <DrawerBody>
            <Center>
              <HStack
                alignContent="center"
                alignItems="center"
                my="auto"
                float="right"
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
                    <Text > {currPlayback.item.name}</Text>
                  </Flex>
                  <Flex alignItems="center">
                      <BsPerson/>
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
                      <BiAlbum/>
                    <Text >
                     {currPlayback.item.album.name}
                    </Text>
                  </Flex>
                </Stack>
                <TransportControls />
              </HStack>
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AudioPlayerMobile;
