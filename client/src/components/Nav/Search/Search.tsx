import React, { useState, useContext } from "react";
import SearchInput from "./SearchInput";
import SearchTrackList from "./SearchTrackList";
import {
  Center,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { UserContext } from "../../../contexts/UserContext";

// import {SearchIcon} from '@chakra-ui/icons'
function Search() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [trackList, setTrackList] = useState([]);
  const { userObj } = useContext(UserContext);
  return (
    <>
      <IconButton
        variant="ghost"
        m={4}
        aria-label="spotify search"
        onClick={onOpen}
        icon={<SearchIcon />}
      ></IconButton>

      <Modal
        scrollBehavior="inside"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="3xl"
        colorScheme="brand"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>
            <SearchInput
            // width="100%"
              userObj={userObj}
              query={searchQuery}
              setSearchQuery={setSearchQuery}
              setTrackList={setTrackList}
            />
            </Center>
          </ModalHeader>
          <ModalBody>
            {trackList.length > 0 && <SearchTrackList trackList={trackList} />}
          </ModalBody>
        <ModalFooter>
          <ModalCloseButton />
        </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Search;
