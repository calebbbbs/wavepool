import React, { useContext, useEffect } from "react";
import { BsMusicNoteBeamed } from 'react-icons/bs'
import { UserContext } from "../../../contexts/UserContext";
import {
  chakra,
  Flex,
  Image,
  Text,
  Stack,
  Center,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Button,
  DrawerCloseButton,
  useDisclosure,
  useColorModeValue,
  Tooltip
} from "@chakra-ui/react";

import { TransportControls } from "./TransportControls";



export const AudioPlayer = () => {
  const bg = useColorModeValue("brand.50", "brand.900")
  const { userObj, currPlayback, getUsersCurrentPlayback } =
    useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const interval = setInterval(() => {
      getUsersCurrentPlayback(userObj.user_id);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Tooltip label="Spotify Controls">
      <Button m={4} variant="ghost" colorScheme="teal" onClick={onOpen}>
     <BsMusicNoteBeamed />
      </Button>
      </Tooltip>
      <Drawer
      isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton />
          <DrawerBody>
            <Center>
              <Flex m={4} float="right" fontSize="xs">
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
                  <Text >Track: {currPlayback.item.name}</Text>
                  <Text >
                    Album: {currPlayback.item.album.name}
                  </Text>
                  <chakra.div >
                    Artist:{" "}
                    {currPlayback.item.artists.map((artist: any, i: number) => {
                      if (i === currPlayback.item.artists.length - 1) {
                        return (
                          <chakra.span  key={i}>
                            {artist.name}
                          </chakra.span>
                        );
                      }
                      return (
                        <chakra.span  key={i}>
                          {artist.name},{" "}
                        </chakra.span>
                      );
                    })}
                  </chakra.div>
                  <TransportControls />
                </Stack>
              </Flex>
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AudioPlayer;
