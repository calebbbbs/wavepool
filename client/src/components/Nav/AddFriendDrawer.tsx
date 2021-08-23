import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";
import { UserContext } from '../../contexts/UserContext'
import FriendStat from './FriendStat';
import { useMutation, useQuery, gql } from "@apollo/client";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Button,
  DrawerContent,
  DrawerCloseButton,
  Heading
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";

const GET_FRIENDS = gql`
  query Query($getUserUserId: String!) {
    getUser(user_id: $getUserUserId) {
      friends {
        friend_id
        friend_name
        friend_status
      }
    }
  }
`;

const CREATE_FRIEND = gql`
mutation CreateFriendMutation($createFriendData: CreateFriendInput!) {
  createFriend(data: $createFriendData) {
    user_id
    friend_id
    friend_status
  }
}
`;

function AddFriendDrawer() {
  const [ createFriend ] = useMutation(CREATE_FRIEND);
  const [ newFriendInput, setNewFriendInput ] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userObj } = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_FRIENDS, {
    variables: { getUserUserId: userObj.user_id },
  });
  
  if (error) console.error(error);
  if (loading) return <p>Loading ...</p>;

  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        <AddIcon/>
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add Friend</DrawerHeader>

          <DrawerBody>
            <Input
              value={newFriendInput}
              onChange={(e) => {
                setNewFriendInput(e.target.value);
              }}
              placeholder="Type here..."
            />

            <Button 
              onClick={() => {
                createFriend({
                  variables: {
                    createFriendData: {
                      user_id: userObj.user_id,
                      friend_email: newFriendInput,
                      friend_status: false
                    },
                  },
                });
              }}
            >Send</Button>
            <br/>
            <br/>
            <Heading
              size="md"
            >Friends:</Heading>
            <br/>
            {data.getUser.friends.map((friend: any, i: number) => {
              if(friend.friend_status){
                return <FriendStat friend={friend} key={i}/>
              }
              return;
            })}
            <br/>
            <br/>
            <Heading
              size="md"
            >Pending friends:</Heading>
            <br/>
            {data.getUser.friends.map((friend: any, i: number) => {
              if(!friend.friend_status){
                return <FriendStat friend={friend} key={i}/>
              }
              return;
            })}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">New Friend</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AddFriendDrawer;
