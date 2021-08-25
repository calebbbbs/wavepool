import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../contexts/UserContext';

import {
  Link,
  Button,
  useColorModeValue,
  chakra,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

const AddToPlaylist = (props: any) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { userObj } = useContext(UserContext);

  const bg = useColorModeValue('brand.50', 'brand.900');

  const list = props.playlists.map((playlist: any, i: number) => {
    return (
      <chakra.div
        onClick={() => {

          axios
            .get(
              `http://localhost:4000/spotify/addToPlaylist/${userObj.user_id}/${playlist.id}/${props.trackUri}`
            )
            .then((data: any) => {
              onClose();
              data});
        }}
        key={i}
      >
       <Link> {playlist.name} </Link>
      </chakra.div>
    );
  });
  return (
    <>
    <Button  variant="ghost" onClick={onOpen}>
      <AddIcon/>
    </Button>
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent
      bg={bg}>
        <DrawerCloseButton />
        <DrawerHeader>Add to Playlist</DrawerHeader>

        <DrawerBody>
        {list && <div> {list}</div>}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </>
  );
};

export default AddToPlaylist;
