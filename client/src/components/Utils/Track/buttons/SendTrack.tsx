import React, { useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import {
  Button,
  // Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  useDisclosure,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { UserContext } from "../../../../contexts/UserContext";
import { RiMailSendLine } from "react-icons/ri";
// import RECOMMEND_TRACK from "../../../../graphql_client/mutations/RECOMMEND_TRACK";

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
  const bg = useColorModeValue("brand.50", "brand.900");

  const { selectedFriend, userObj } = useContext(UserContext);
  const { onOpen, onClose } = useDisclosure();
  const [recommendTrack] = useMutation(RECOMMEND_TRACK);

  return (
    <Popover placement="right">
      <PopoverTrigger>
        {/* <Tooltip placement="right" label="Send Track"> */}
          <Button variant="ghost " onClick={onOpen}>
            <RiMailSendLine />
          </Button>
        {/* </Tooltip> */}
      </PopoverTrigger>
      <PopoverContent bg={bg}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Send Track?</PopoverHeader>
        <PopoverBody>
          <chakra.span>
            Are you sure you want to send {props.track.track_title} to{" "}
            {selectedFriend[1]}?
          </chakra.span>
          <Button
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
              onClose();
            }}
          >
            Send
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SendTrack;
