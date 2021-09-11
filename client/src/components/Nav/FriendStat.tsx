import React, { useContext } from 'react';
import {
  Box,
  Link } from '@chakra-ui/react';
import { useMutation, gql } from "@apollo/client";
import { UserContext } from '../../contexts/UserContext'
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import SocketContext from '../Main/SocketContext';


const CONFIRM_FRIEND = gql`
mutation ConfirmFriendMutation($confirmFriendData: ConfirmFriendInput!) {
  ConfirmFriend(data: $confirmFriendData) {
    user_id
    friend_id
  }
}
`;

const DENY_FRIEND = gql`
mutation DenyFriendMutation($denyFriendData: DenyFriendInput!) {
  DenyFriend(data: $denyFriendData) {
    user_id
    friend_id
  }
}
`;

const FriendStat = (props: any) => {
const { friend_id } = props;
const [ confirmFriend] = useMutation(CONFIRM_FRIEND);
const [ denyFriend ] = useMutation(DENY_FRIEND);
const { userObj, refetch } = useContext(UserContext);
const {socket} = useContext(SocketContext);

const friendConfirmed = (data: any) => {
  socket.emit("notification", data);
};

const friendDenied = (data: any) =>{
  socket.emit("notification", data);
}
  return (
  <Box>
      <Link
      colorScheme="green"
        onClick={() => {
          confirmFriend({
            variables: {
              confirmFriendData: {
                user_id: friend_id,
                friend_id: userObj.user_id,
              },
            },
          });
          const temp = {
            userId: userObj.user_name,
            friendId: friend_id,
            action: 'New Friend!',
            message: `${userObj.user_name} accepted your friend request!`
          };

          setTimeout(() => {refetch()}, 1500)
          friendConfirmed(temp);
        }}
      ><CheckIcon/></Link>
      <br/>
      <Link
      colorScheme="green"
        onClick={() => {
          denyFriend({
            variables: {
              denyFriendData: {
                user_id: friend_id,
                friend_id: userObj.user_id,
              },
            },
          });
          const temp = {
            userId: userObj.user_name,
            friendId: friend_id,
            status: 'warning',
            action: 'Hate to be the one to tell you, but',
            message: `${userObj.user_name} denied your friend request.`
          };

          setTimeout(() => {refetch()}, 1500)
          friendDenied(temp);
        }}
      ><DeleteIcon/></Link>
      </Box>
  )}
export default FriendStat;