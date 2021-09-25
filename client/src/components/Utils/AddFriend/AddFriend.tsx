import React, { useState, useContext, useEffect } from "react";
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
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMutation, gql } from "@apollo/client";
import { AddIcon } from "@chakra-ui/icons";
import { UserContext } from "../../../contexts/UserContext";
import SocketContext from "../../../contexts/SocketContext";

const CREATE_FRIEND = gql`
  mutation Mutation($createFriendData: CreateFriendInput!) {
    createFriend(data: $createFriendData) {
      user_id
    }
  }
`;

const CREATE_NOTIFICATION = gql`
  mutation CreateNotificationMutation($createNotificationData: CreateNotificationInput!) {
    createNotification(data: $createNotificationData) {
    user_id
    friend_id
    action
    message
    created_at
    viewed
    }
  }
  `;

const AddFriend = () => {
  const toast = useToast();
  const [createFriend, { data, error }] = useMutation(CREATE_FRIEND);
  const { userObj } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [friendInput, setFriendInput] = useState("");
  const bg = useColorModeValue("brand.100", "brand.800");
  const [createNotification] = useMutation(CREATE_NOTIFICATION);
  const { socket } = useContext(SocketContext);
  const friendNotif = (data: any) => {
    socket.emit("notification", data);
  };
  useEffect(() => {
    if (data && !error) {
      if (data.createFriend.user_id === userObj.user_id) {
        toast({
          title: `This Person is Already Your Friend`,
          status: "error",
          isClosable: true,
        });
      } else {
        const temp = {
          userId: userObj.user_name,
          friendId: data.createFriend.user_id,
          action: "New Friend Request",
          message: `${userObj.user_name} sent you a Friend Request!`,
        };
        friendNotif(temp);
      }
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (data && !error) {
      if (data.createFriend.user_id === userObj.user_id) {
        return;
      } else {
        createNotification({
          variables: {
            createNotificationData: {
              user_id: userObj.user_id,
              friend_id: data.createFriend.user_id,
              action: "New Friend Request",
              message: `${userObj.user_name} sent you a Friend Request!`,
              created_at: new Date().toString(),
              viewed: false,
            },
          },
        });
        console.log(userObj.user_id);
        console.log(data.createFriend.user_id);
        console.log(`${userObj.user_name} sent you a Friend Request!`);
        console.log(new Date().toString());
      }
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (error) {
      toast({
        title: `User Not Found`,
        status: "error",
        isClosable: true,
      });
    }
  }, [error]);

  return (
    <>
      <Button variant="ghost" aria-label="friend search" onClick={onOpen}>
        <AddIcon />
        Add New Friend{" "}
      </Button>

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
          <ModalHeader>Add Friend</ModalHeader>
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
