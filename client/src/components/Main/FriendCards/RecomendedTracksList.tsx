import React, { useContext } from "react";
import {
  Button,
  chakra,
  Center,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";



import { CloseIcon } from "@chakra-ui/icons";
import TrackComp from "../../Utils/Track/TrackComp";
import { RiThumbDownLine, RiThumbUpLine, RiThumbUpFill } from "react-icons/ri";
import { UserContext } from "../../../contexts/UserContext";
import { gql, useMutation } from "@apollo/client";

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
  const { refetch } = useContext(UserContext);
  const [removeRec] = useMutation(REMOVE_REC);
  const [updateFriendship] = useMutation(UPDATE_FRIENDSHIP);
  const [trackResponded] = useMutation(TRACK_RESPONDED);


  const bg = useColorModeValue("brand.50", "brand.900");


  const list = props.recommendedTracks.map((e: any, i: number) => {
    return (
      <chakra.div bg={bg} key={i}>

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
            setTimeout(() => {
              refetch();
            }, 1500);
          }}
        >
          <CloseIcon />
        </Button>
        <Center>
          <Tooltip placement="left" label="Like">
            {e.been_liked ? (
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
                }}
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
                  setTimeout(() => {
                    refetch();
                  }, 1500);
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
                setTimeout(() => {
                  refetch();
                }, 1500);
              }}
            >
              <RiThumbDownLine />
            </Button>
          </Tooltip>
        </Center>
        <TrackComp track={e}/>
      </chakra.div>
    );
  });


  return <div>
    {list}</div>;
};

export default RecommendedTracksList;
