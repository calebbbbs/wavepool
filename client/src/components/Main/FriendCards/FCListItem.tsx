import React, { useContext } from "react";
import FriendStat from "../../Nav/FriendStat";

import {
  AccordionItem,
  chakra,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Button,
  Badge,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import RecommendedTracksList from "./RecomendedTracksList";
import StatsModal from "./StatsModal";
import { UserContext } from "../../../contexts/UserContext";
import {ImRadioChecked, ImRadioUnchecked} from 'react-icons/im'
const FCListItem = (props: any) => {
  console.log(props);
  const list = props.userObj.recommendedTracks.filter((recTrack: any) => {
    return recTrack.friend_name === props.friendName;
  });


  const { selectedFriend, setSelectedFriend } = useContext(UserContext);
  const isSelected = selectedFriend[0] === props.friendId;
  const bg = useColorModeValue("brand.100", "brand.800");
  const bg2 = useColorModeValue("brand.200", "brand.700");

  return (
    <Flex alignItems="center">
    <AccordionItem 
    w="90%">
      <h2
      >
        <AccordionButton>
          <Box
            borderRadius="15px"
            p={5}
            bg={isSelected ? bg2 : bg}
            flex="1"
            textAlign="left"
          >
            {props.friendName}
            {props.friendStatus === false && <FriendStat friend_name={props.friendName}
            friend_id={props.friendId}
            friend_status={props.friend_status}/>}
            <Badge colorscheme="green" float="right">
              {list.length.toString()}
            </Badge>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <RecommendedTracksList recommendedTracks={list.reverse()} />
      </AccordionPanel>
    </AccordionItem>
    <StatsModal/>
    <Button 
    variant="ghost"
    onClick={() => {
      setSelectedFriend([props.friendId, props.friendName]);
      
    }}
    ml={2}>{isSelected ?<chakra.div minW="10px" minH="10px"> <ImRadioChecked/> </chakra.div>:<chakra.div minW="10px" minH="10px"> <ImRadioUnchecked/></chakra.div>}</Button>
    </Flex>
  );
};

export default FCListItem;
