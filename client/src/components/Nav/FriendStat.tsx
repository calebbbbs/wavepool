import React, { useContext } from 'react';
import { 
  Box, 
  Text,
  Button,
  Flex } from '@chakra-ui/react';
import { useMutation, gql } from "@apollo/client";
import { UserContext } from '../../contexts/UserContext'

const CONFIRM_FRIEND = gql`
mutation ConfirmFriendMutation($confirmFriendData: ConfirmFriendInput!) {
  ConfirmFriend(data: $confirmFriendData) {
    user_id
    friend_id
  }
}
`;

const FriendStat = (props: any) => {
const { friend_name, friend_status, friend_id } = props.friend;
const [ confirmFriend ] = useMutation(CONFIRM_FRIEND);
const { userObj } = useContext(UserContext);

  return (
  <Box>

    {friend_status ?(
      <Text>
        {friend_name}
      </Text>
      ):(
      <Flex>
        <Text>
          {friend_name}
        </Text>
      <Button
        onClick={() => {
          console.log(friend_id, userObj.user_id)
          confirmFriend({
            variables: {
              confirmFriendData: {
                user_id: friend_id,
                friend_id: userObj.user_id,
              },
            },
          });
        }}
      >Confirm</Button>
    </Flex>)}
  </Box>
  );
};

export default FriendStat;