import React, { useContext } from 'react';
import { Link, HStack } from '@chakra-ui/react';
import { useMutation, gql } from '@apollo/client';
import { UserContext } from '../../contexts/UserContext';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import SocketContext from '../../contexts/SocketContext';

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

const CREATE_NOTIFICATION = gql`
  mutation CreateNotificationMutation(
    $createNotificationData: CreateNotificationInput!
  ) {
    createNotification(data: $createNotificationData) {
      user_id
      friend_id
      action
      message
      timestampp
      photo
      viewed
    }
  }
`;

const FriendStat = (props: any) => {
  const { friend_id } = props;
  const [confirmFriend] = useMutation(CONFIRM_FRIEND);
  const [denyFriend] = useMutation(DENY_FRIEND);
  const [createNotification] = useMutation(CREATE_NOTIFICATION);
  const { userObj, refetch } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const friendConfirmed = (data: any) => {
    socket.emit('notification', data);
  };

  const friendDenied = (data: any) => {
    socket.emit('notification', data);
  };

  return (
    <HStack>
      <Link
        colorScheme='green'
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
            message: `${userObj.user_name} accepted your friend request!`,
          };
          friendConfirmed(temp);
          createNotification({
            variables: {
              createNotificationData: {
                user_id: userObj.user_name,
                friend_id: friend_id,
                action: 'New Friend!',
                message: `${userObj.user_name} accepted your friend request!`,
                timestampp: new Date().toString(),
                photo: `${userObj.photo}`,
                viewed: false,
              },
            },
          });
          setTimeout(() => {
            refetch();
          }, 1500);
        }}
      >
        <CheckIcon />
      </Link>
      <br />
      <Link
        colorScheme='green'
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
            message: `${userObj.user_name} denied your friend request.`,
          };
          friendDenied(temp);
          createNotification({
            variables: {
              createNotificationData: {
                user_id: userObj.user_name,
                friend_id: friend_id,
                action: 'Denied Friend Request',
                message: `${userObj.user_name} denied your friend request.`,
                timestampp: new Date().toString(),
                photo: `${userObj.photo}`,
                viewed: false,
              },
            },
          });
          setTimeout(() => {
            refetch();
          }, 1500);
        }}
      >
        <DeleteIcon />
      </Link>
    </HStack>
  );
};
export default FriendStat;
