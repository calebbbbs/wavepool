import React, { useContext } from 'react';
import {
  Box,
  Link } from '@chakra-ui/react';
import { useMutation, gql } from "@apollo/client";
import { UserContext } from '../../contexts/UserContext'
import { CheckIcon } from '@chakra-ui/icons';
const CONFIRM_FRIEND = gql`
mutation ConfirmFriendMutation($confirmFriendData: ConfirmFriendInput!) {
  ConfirmFriend(data: $confirmFriendData) {
    user_id
    friend_id
  }
}
`;

const FriendStat = (props: any) => {
const { friend_id } = props;
const [ confirmFriend ] = useMutation(CONFIRM_FRIEND);
const { userObj } = useContext(UserContext);

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
        }}
      ><CheckIcon/></Link>
      </Box>
  )}
export default FriendStat;