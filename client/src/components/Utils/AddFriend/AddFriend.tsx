import React, { useState, useContext } from 'react';
import {
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Button,
  ModalCloseButton,
  IconButton,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { useMutation, gql } from '@apollo/client';
import { AddIcon } from '@chakra-ui/icons';

import { UserContext } from '../../../contexts/UserContext';

const CREATE_FRIEND = gql`
  mutation Mutation($createFriendData: CreateFriendInput!) {
    createFriend(data: $createFriendData) {
      user_id
      friend_id
      friend_name
    }
  }
`;

const AddFriend = () => {
  const [createFriend] = useMutation(CREATE_FRIEND);
  const { userObj } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [friendInput, setFriendInput] = useState('');
  const bg = useColorModeValue('brand.100', 'brand.800');

  return (
    <>
      <Tooltip label='Add A Friend'>
        <IconButton
          variant="ghost"
          aria-label="friend search"
          onClick={onOpen}
          icon={<AddIcon />}
        ></IconButton>
      </Tooltip>

      <Modal
        scrollBehavior='inside'
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        size='3xl'
        colorScheme='brand'
      >
        <ModalOverlay />
        <ModalContent bg={bg}>
          <ModalHeader>Add Friend</ModalHeader>
          <ModalBody
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: useColorModeValue('brand.400', 'brand.900'),
                borderRadius: '24px',
              },
            }}
          >
            <Input
              value={friendInput}
              onChange={(e) => {
                setFriendInput(e.target.value);
              }}
            ></Input>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                createFriend({
                  variables: {
                    createFriendData: {
                      user_id: userObj.user_id,
                      friend_email: friendInput,
                      friend_status: false,
                    },
                  },
                });
                // friendNotif(userObj.user_id);
                onClose();
              }}
            >
              Send Request
            </Button>
            <ModalCloseButton />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddFriend;
