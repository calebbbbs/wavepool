import React, { useContext, useEffect } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { TransportControls } from "./TransportControls";
export const AudioPlayer = () => {
  const { currPlayback, getUsersCurrentPlayback, userObj } =
    useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const interval = setInterval(() => {
      getUsersCurrentPlayback(userObj.access_token);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Button m={4} variant="ghost" colorScheme="teal" onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
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
