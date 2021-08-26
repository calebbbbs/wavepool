import React from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    useColorModeValue
  } from "@chakra-ui/react"

import { AiOutlineBarChart } from 'react-icons/ai';

const StatsModal = () => {
    const {onOpen, isOpen, onClose} = useDisclosure();
    const bg = useColorModeValue('brand.200', "brand.800")
    return (
        <>
        <Button variant="ghost" onClick={onOpen}><AiOutlineBarChart/></Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
          bg={bg}
          >
            <ModalHeader>Charts & Stuff</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" float="right" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default StatsModal
