import React, { useContext } from 'react';
import axios from 'axios';
import { useMutation, gql } from '@apollo/client';
import { Button, Tooltip } from '@chakra-ui/react';
import { UserContext } from '../../../../contexts/UserContext';
import { BiPlay } from 'react-icons/bi';

const playNow = (user_id: string, spotify_uri: string) => {
  axios.get(`/spotify/playNow/${user_id}/${spotify_uri}`).then((data) => data);
};

const UPDATE_FRIENDSHIP = gql`
mutation UpdateFriendshipMutation(
  $updateFriendshipData: UpdateFriendshipInput!) {
  UpdateFriendship(data: $updateFriendshipData)
}
`;

const PlayNow = (props: any) => {
  const [updateFriendship] = useMutation(UPDATE_FRIENDSHIP);
  const { userObj } = useContext(UserContext);
  return (
    <Tooltip placement='left' label='Play Now'>
      <Button
        variant='ghost'
        onClick={() => {
          if(props.friend_id) {
            updateFriendship({
              variables: {
                updateFriendshipData: {
                  user_id: props.friend_id,
                  friend_id: userObj.user_id,
                  action: "queue"
                },
              },
            });
          }
          playNow(props.user_id, props.track_uri);
        }}
      >
        <BiPlay />
      </Button>
    </Tooltip>
  );
};

export default PlayNow;
