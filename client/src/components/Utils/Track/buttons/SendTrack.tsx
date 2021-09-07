import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
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
} from '@chakra-ui/react';
import { UserContext } from '../../../../contexts/UserContext';
import { RiMailSendLine } from 'react-icons/ri';
// import { Track } from "client/src/types";
// import RECOMMEND_TRACK from "../../../../graphql_client/mutations/RECOMMEND_TRACK";
import SocketContext from "../../../Main/SocketContext";
const RECOMMEND_TRACK = gql`
  mutation CreateRecommendedMutation(
    $createRecommendedData: CreateRecommendedInput!
  ) {
    createRecommended(data: $createRecommendedData) {
      user_id
      friend_id
      track_title
      artists
      spotify_uri
      album_title
      album_art
    }
  }
`;
const SendTrack = (props: any) => {
  const bg = useColorModeValue('brand.50', 'brand.900');
  const { selectedFriend, userObj } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recommendTrack] = useMutation(RECOMMEND_TRACK);
  const { socket } = useContext(SocketContext);

  const trackNotif = (data: any) => {
    socket.emit("recommendTrack", data);
  };
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="left"
    >
      <PopoverTrigger>
        {/* <Tooltip placement="right" label="Send Track"> */}
    <Tooltip placement="right" label="Send Track">
        <Button variant="ghost " onClick={onOpen}>
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
              <b>{props.track.track_title}{" "}</b>to{" "}
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
                      spotify_uri: props.track.spotify_uri,
                      artists: props.track.artists[0],
                      album_title: props.track.album_title,
                      album_art: props.track.album_art,
                    },
                  },
                });
                const temp = {
                  userId: userObj.user_id,
                  friendId: selectedFriend[0],
                };
                trackNotif(temp);
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
          <PopoverCloseButton/>
        </PopoverContent>
      )}
    </Popover>
   
  );
};

export default SendTrack;
