import React, { useContext, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import {
  Button,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Text,
  useDisclosure,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { UserContext } from "../../../../contexts/UserContext";
import { RiMailSendLine } from "react-icons/ri";
import SocketContext from "../../../../contexts/SocketContext";
// import moment from 'moment';

const RECOMMEND_TRACK = gql`
  mutation CreateRecommendedMutation(
    $createRecommendedData: CreateRecommendedInput!
  ) {
    createRecommended(data: $createRecommendedData) {
      track_title
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

const SendTrack = (props: any) => {
  const bg = useColorModeValue("brand.50", "brand.900");
  const { selectedFriend, userObj } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recommendTrack, { error, data }] = useMutation(RECOMMEND_TRACK);
  const [createNotification] = useMutation(CREATE_NOTIFICATION);
  const { socket } = useContext(SocketContext);
  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (data) {
      const temp = {
        userId: userObj.user_name,
        friendId: selectedFriend[0],
        action: "New Track!",
        message: `${userObj.user_name} sent you a track!`,
      };
      trackNotif(temp);
    }
  }, [JSON.stringify(data)]);



  const trackNotif = (data: any) => {
    socket.emit("notification", data);
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="left">
      <PopoverTrigger>
        {/* <Tooltip placement="right" label="Send Track"> */}
        <Tooltip placement="right" label="Send Track">
          <Button variant="ghost" onClick={onOpen}>
            <RiMailSendLine />
          </Button>
        </Tooltip>
      </PopoverTrigger>
      {selectedFriend[1] ? (
        <PopoverContent bg={bg}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Send Track?</PopoverHeader>
          <PopoverBody>
            <chakra.span>Are you sure you want to send </chakra.span>
            <chakra.span>
              <b>{props.track.track_title} </b>to{" "}
            </chakra.span>
            <chakra.span>
              <b>{selectedFriend[1]}</b>?
            </chakra.span>
            <Button
              colorScheme="green"
              float="right"
              onClick={() => {
                recommendTrack({
                  variables: {
                    createRecommendedData: {
                      user_id: userObj.user_id,
                      friend_id: selectedFriend[0],
                      track_title: props.track.track_title,
                      track_uri: props.track.track_uri,
                      artist_uri: props.track.artist_uri,
                      album_uri: props.track.album_uri,
                      artists: props.track.artists,
                      album_title: props.track.album_title,
                      album_art: props.track.album_art,
                    },
                  },
                });
                createNotification({
                  variables: {
                    createNotificationData: {
                      user_id: userObj.user_name,
                      friend_id: selectedFriend[0],
                      action: "New Track!",
                      message: `${userObj.user_name} sent you a track!`,
                      created_at: new Date().toString(),
                      viewed: false,
                    },
                  },
                });
                onClose();
              }}
            >
              Send
            </Button>
          </PopoverBody>
        </PopoverContent>
      ) : (
        <PopoverContent bg={bg}>
          <PopoverBody>
            <Text>{"Select somebody to send a track to!"}</Text>
          </PopoverBody>
          <PopoverCloseButton />
        </PopoverContent>
      )}
    </Popover>
  );
};

export default SendTrack;
