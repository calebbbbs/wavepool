import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  chakra,
  Center,
  useColorModeValue,
  Tooltip,
  Flex,
  Spacer
} from "@chakra-ui/react";



import { CloseIcon } from "@chakra-ui/icons";
import TrackComp from "../../Utils/Track/TrackComp";
import { RiThumbDownLine, RiThumbUpLine, RiThumbUpFill } from "react-icons/ri";
import { UserContext } from "../../../contexts/UserContext";
import { gql, useMutation } from "@apollo/client";
import SocketContext from '../../../contexts/SocketContext'


const REMOVE_REC = gql`
  mutation RemoveRecommendedMutation(
    $removeRecommendedData: RemoveRecommendedInput!
  ) {
    RemoveRecommended(data: $removeRecommendedData)
  }
`;

const UPDATE_FRIENDSHIP = gql`
  mutation UpdateFriendshipMutation(
    $updateFriendshipData: UpdateFriendshipInput!
  ) {
    UpdateFriendship(data: $updateFriendshipData)
  }
`;
const TRACK_RESPONDED = gql`
  mutation TrackRespondedMutation($trackRespondedData: TrackRespondedInput!) {
    trackResponded(data: $trackRespondedData)
  }
`;

const RecommendedTracksList = (props: any) => {
  const { refetch, userObj } = useContext(UserContext);
  const [removeRec] = useMutation(REMOVE_REC);
  const [updateFriendship, {data}] = useMutation(UPDATE_FRIENDSHIP);
  const [trackResponded, trackRespondedReturn] = useMutation(TRACK_RESPONDED);
  const bg = useColorModeValue("brand.50", "brand.900");
  const { socket } = useContext(SocketContext);
  const [temp, setTemp] = useState<any>({});
useEffect(() =>{
  if(data){
    refetch();
    respond(temp)
  }
}, [JSON.stringify(data)])

useEffect(() =>{
  if(data){
    refetch();
    respond(temp);
  }
}, [JSON.stringify(trackRespondedReturn.data)]);


  const respond = (data: any) => {
    socket.emit("notification", data);
  }
  const list = props.recommendedTracks.map((e: any, i: number) => {
    return (
      <chakra.div maxW='350px' bg={bg} key={i}>
        <Flex
        >
        <Button
          variant="ghost"
          onClick={() => {
            removeRec({
              variables: {
                removeRecommendedData: {
                  user_id: e.user_id,
                  track_title: e.track_title,
                },
              },
            });
            setTimeout(() => refetch(), 500)
          }}
        >
          <CloseIcon />
        </Button>
        <Spacer/>
        <Center>
          <Tooltip placement="left" label="Like">
            {e.been_liked ? (
              <Button
                variant="ghost"
              >
                <RiThumbUpFill />
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => {
                  trackResponded({
                    variables: {
                      trackRespondedData: {
                        user_id: e.user_id,
                        track_id: e.id,
                      },
                    },
                  });
                  updateFriendship({
                    variables: {
                      updateFriendshipData: {
                        user_id: e.friend_id,
                        friend_id: e.user_id,
                        action: "like",
                      },
                    },
                  });
                  setTemp({
                    userId: e.friend_id,
                    friendId: e.user_id,
                    status: 'info',
                    action: "👍 Liked Track!",
                    message: `${userObj.user_name} liked ${e.track_title} by ${e.artists[0]}`,
                  })
                }
              }
              >
                <RiThumbUpLine />
              </Button>
            )}
          </Tooltip>
          <Tooltip placement="right" label="Dislike">
            <Button
              variant="ghost"
              onClick={() => {
                updateFriendship({
                  variables: {
                    updateFriendshipData: {
                      user_id: e.friend_id,
                      friend_id: e.user_id,
                      action: "dislike",
                    },
                  },
                });
                removeRec({
                  variables: {
                    removeRecommendedData: {
                      user_id: e.user_id,
                      track_title: e.track_title,
                    },
                  },
                });
                setTemp({
                  userId: e.friend_id,
                  friendId: e.user_id,
                  status: 'warning',
                  action: "👎 Disliked Track!",
                  message: `${userObj.user_name} disliked ${e.track_title} by ${e.artists[0]}`,
                });
              }}
            >
              <RiThumbDownLine />
            </Button>
          </Tooltip>
        </Center>
        </Flex>
        <TrackComp track={e}/>
      </chakra.div>
    );
  });


  return <div>
    {list}</div>;
};

export default RecommendedTracksList;
