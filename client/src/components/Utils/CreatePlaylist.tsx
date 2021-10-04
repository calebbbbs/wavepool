import React, { useContext, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { UserContext } from '../../contexts/UserContext';

import {
  MenuItem,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  chakra,
  Button,
  Text,
} from '@chakra-ui/react';

import { MdPlaylistAdd } from 'react-icons/md';

const CreatePlaylist = (props: any) => {
  const { userObj, getUserPlaylists } = useContext(UserContext);
  const bg = useColorModeValue('brand.100', 'brand.800');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDesc, setPlaylistDesc] = useState('');
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem onClick={onOpen}>
        <MdPlaylistAdd size={25} />
        <Text ml={2}>Create New Playlist</Text>
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalHeader>New Playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <chakra.div m={4}>
              <Input
                mb={4}
                placeholder='Playlist Title'
                value={playlistName}
                onChange={(e) => {
                  setPlaylistName(e.target.value);
                }}
              ></Input>
              <Textarea
                placeholder='Playlist Description'
                value={playlistDesc}
                onChange={(e) => {
                  setPlaylistDesc(e.target.value);
                }}
              ></Textarea>
            </chakra.div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant='ghost'
              onClick={() => {
                axios
                  .post(
                    `/spotify/createPlaylist/${playlistName}/${userObj.user_id}`,
                    { playlist_desc: playlistDesc }
                  )
                  .then((data: any) => {
                    getUserPlaylists();
                    return data;
                  })
                  .catch((error: AxiosError) =>
                    console.log(
                      'Error from axios.post/spotify/createPlaylist CreatePlaylist',
                      error.response?.data
                    )
                  );
                onClose();
              }}
            >
              Create Playlist
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePlaylist;
