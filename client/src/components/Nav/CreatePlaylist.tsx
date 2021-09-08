import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

import {
  Button,
  Input,
  Textarea,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  chakra
} from "@chakra-ui/react";

import { MdPlaylistAdd } from "react-icons/md";


const CreatePlaylist = (props: any) => {
  const { userObj, getUserPlaylists } = useContext(UserContext);
  const bg = useColorModeValue('brand.100', 'brand.800');
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");
  const { onOpen, isOpen, onClose } = useDisclosure();


  return (
    <>
      <Tooltip label="Create Playlist" placement="bottom">
        <Button variant="ghost" onClick={onOpen}>
          <MdPlaylistAdd size={25}/>
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
        bg={bg}>
          <ModalHeader>New Playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <chakra.div
            m={4}>
            <Input
            mb={4}
            placeholder="Playlist Title"
              value={playlistName}
              onChange={(e) => {
                setPlaylistName(e.target.value);
              }}
            ></Input>
            <Textarea
            placeholder="Playlist Description"
              value={playlistDesc}
              onChange={(e) => {
                setPlaylistDesc(e.target.value);
              }}
            ></Textarea>
            </chakra.div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => {
                axios
                  .post(
                    `/spotify/createPlaylist/${playlistName}/${userObj.user_id}`,
                    { playlist_desc: playlistDesc }
                  )
                  .then((data: any) => {
                    getUserPlaylists();
                    return data});
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
