import React, { useState, useContext } from "react";
import SearchInput from "./SearchInput";
import SearchTrackList from "./SearchTrackList";
import {
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { UserContext } from "../../../contexts/UserContext";

// import {SearchIcon} from '@chakra-ui/icons'
function Search() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [trackList, setTrackList] = useState([]);
  const { userObj } = useContext(UserContext);
  const bg = useColorModeValue("brand.100", "brand.800");
  return (
    <>
      <Tooltip label="Search">
        <IconButton
          variant="ghost"
          aria-label="spotify search"
          onClick={onOpen}
          icon={<SearchIcon />}
        ></IconButton>
      </Tooltip>

      <Modal
        scrollBehavior="inside"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="3xl"
        colorScheme="brand"
      >
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalHeader>
            <SearchInput
              // width="100%"
              userObj={userObj}
              query={searchQuery}
              setSearchQuery={setSearchQuery}
              setTrackList={setTrackList}
            />
          </ModalHeader>
          <ModalBody
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: useColorModeValue("brand.400", "brand.900"),
                borderRadius: "24px",
              },
            }}
          >
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
