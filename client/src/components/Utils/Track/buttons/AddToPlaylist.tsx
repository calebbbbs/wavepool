import React, { useContext } from 'react';
import axios, {AxiosError} from 'axios';
import { UserContext } from '../../../../contexts/UserContext';
import { useMutation, gql } from '@apollo/client';
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
  Tooltip,
  useToast
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

const UPDATE_FRIENDSHIP = gql`
mutation UpdateFriendshipMutation(
  $updateFriendshipData: UpdateFriendshipInput!) {
  UpdateFriendship(data: $updateFriendshipData)
}
`;

const AddToPlaylist = (props: any) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { userObj, getUserPlaylists } = useContext(UserContext);
  const [updateFriendship] = useMutation(UPDATE_FRIENDSHIP);
  const toast = useToast();
  const bg = useColorModeValue('brand.50', 'brand.900');
  const list = props.playlists.map((playlist: any, i: number) => {
    return (
      <chakra.div
        onClick={() => {
          if(props.user_id) {
            updateFriendship({
              variables: {
                updateFriendshipData: {
                  user_id: props.user_id,
                  friend_id: userObj.user_id,
                  action: "playlist"
                },
              },
            });
          }
          axios
            .get(
              `/spotify/addToPlaylist/${userObj.user_id}/${playlist.id}/${props.trackUri}`
            )
            .then((data: any) => { toast({
              title: `Song added to Playlist!`,
              position: 'top-left',
              status: "info",
              isClosable: true,
            })
              onClose();
              data})
              .catch((error: AxiosError) => console.log('Error from axios.get/spotify/addToPlaylist from AddToPlaylist.tsx', error.response?.data));
        }}
        key={i}
      >
       <Link> {playlist.name} </Link>
      </chakra.div>
    );
  });
  return (
    <>
    <Tooltip placement="right" label="Add to Playlist">
    <Button  variant="ghost" onClick={() => {
       getUserPlaylists();
      onOpen()}}>
      <AddIcon/>
    </Button>
    </Tooltip>
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
