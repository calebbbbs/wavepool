import React, {useState, useContext} from "react";
import SearchInput from "./SearchInput";
// import SearchTrackList from './SearchTrackList'
import {
    Modal,
    Button,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton
  } from "@chakra-ui/react"

  import {SearchIcon} from '@chakra-ui/icons'
import { UserContext } from "../../contexts/UserContext";

// import {SearchIcon} from '@chakra-ui/icons'
function Search() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [searchQuery, setSearchQuery] = useState('');
    const {userObj} = useContext(UserContext)
    return (
      <>
        <IconButton aria-label='spotify search' onClick={onOpen} icon={<SearchIcon/>}></IconButton>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <SearchInput userObj={userObj} query={searchQuery} setSearchQuery={setSearchQuery}/>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default Search;