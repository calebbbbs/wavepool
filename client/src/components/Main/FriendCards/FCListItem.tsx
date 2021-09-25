import React, { useContext, useState } from "react";
import FriendStat from "../../Utils/FriendStat";

import {
  AccordionItem,
  chakra,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Tooltip,
  Button,
  Badge,
  Flex,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import Pagination from "../../Utils/Pagination";
import RecommendedTracksList from "./RecomendedTracksList";
import StatsModal from "../../Utils/StatsModal";
import { UserContext } from "../../../contexts/UserContext";
import { ImRadioChecked, ImRadioUnchecked } from "react-icons/im";
import FriendScore from "../../Chartjs/FriendScore";

const FCListItem = (props: any) => {
  // console.log(props);
  const {totalSongs, numberOfLikes, friendId, friendName} = props

  const list = props.userObj.recommendedTracks.filter((recTrack: any) => {
    return (
      recTrack.friend_name === props.friendName && recTrack.in_queue === true
    );
  });

  const { selectedFriend, setSelectedFriend } = useContext(UserContext);
  const isSelected = selectedFriend[0] === props.friendId;
  const bg = useColorModeValue("brand.100", "brand.800");
  const bg2 = useColorModeValue("brand.200", "brand.700");
  const score = props.friendScore / props.totalSongs;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const opts = {base: 2, sm: 3, md: 3, lg: 3, xl: 6}
    const tracksPerPage = useBreakpointValue(opts) || 2;

  const indexOfLastPost = currentPage * tracksPerPage;
  const indexOfFirstPost = indexOfLastPost - tracksPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Flex alignItems="center" flexDirection={{ base: "column", md: "row" }}>
            <Flex flexDirection={{ base: "row", md: "column" }}>
        <StatsModal friendScore={score} user_id={friendId} userName={friendName}/>
        <Tooltip label={`Select ${props.friendName}`}>
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedFriend([props.friendId, props.friendName]);
            }}
            ml={2}
          >
            {isSelected ? (
              <chakra.div minW="10px" minH="10px">
                {" "}
                <ImRadioChecked />{" "}
              </chakra.div>
            ) : (
              <chakra.div minW="10px" minH="10px">
                {" "}
                <ImRadioUnchecked />
              </chakra.div>
            )}
          </Button>
        </Tooltip>
      </Flex>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              minW='350px'
              borderRadius="15px"
              bg={isSelected ? bg2 : bg}
            >
              <Flex
              alignItems="center"
              >
                <FriendScore totalSongs={totalSongs} numberOfLikes={numberOfLikes}/>
                <chakra.div>{props.friendName}</chakra.div>
                {props.friendStatus === false && (
                  <FriendStat
                    friend_name={props.friendName}
                    friend_id={props.friendId}
                    friend_status={props.friend_status}
                  />
                )}
                {props.friendStatus === true && (
                  <Badge colorscheme="green" float="right">
                    {list.length.toString()}
                  </Badge>
                )}
              </Flex>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          {props.friendStatus === false && (
            <FriendStat
              friend_name={props.friendName}
              friend_id={props.friendId}
              friend_status={props.friend_status}
            />
          )}
        </h2>
        <AccordionPanel>
          <RecommendedTracksList
            friendId={props.friendId}
            recommendedTracks={currentPosts}
          />
          <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
            postsPerPage={tracksPerPage}
            totalPosts={list.length}
            paginate={paginate}
          />
        </AccordionPanel>
      </AccordionItem>
     </Flex>
  );
};

export default FCListItem;
