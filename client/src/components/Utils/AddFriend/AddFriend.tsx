import React from 'react'

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

import { AddIcon } from "@chakra-ui/icons";
// import { UserContext } from "../../../contexts/UserContext";

const AddFriend = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { userObj } = useContext(UserContext);
  const bg = useColorModeValue("brand.100", "brand.800");

  return (
    <>
      <Tooltip label="Add A Friend">
        <IconButton
          variant="ghost"
          m={4}
          aria-label="friend search"
          onClick={onOpen}
          icon={<AddIcon />}
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
            {/* <SearchInput
              // width="100%"
              userObj={userObj}
              query={searchQuery}
              setSearchQuery={setSearchQuery}
              setTrackList={setTrackList}
            /> */}
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
            {/* {trackList.length > 0 && <SearchTrackList trackList={trackList} />} */}
          </ModalBody>
          <ModalFooter>
            <ModalCloseButton />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddFriend
