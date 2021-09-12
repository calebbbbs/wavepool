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
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import Pagination from "../../Utils/Pagination";
import RecommendedTracksList from "./RecomendedTracksList";
import StatsModal from "../../Utils/StatsModal";
import { UserContext } from "../../../contexts/UserContext";
import { ImRadioChecked, ImRadioUnchecked } from "react-icons/im";
const FCListItem = (props: any) => {
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
  const [tracksPerPage] = useState<number>(2);

  const indexOfLastPost = currentPage * tracksPerPage;
  const indexOfFirstPost = indexOfLastPost - tracksPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Flex alignItems="center" flexDirection={{ base: "column", md: "row" }}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              borderRadius="15px"
              p={5}
              bg={isSelected ? bg2 : bg}
              flex="1"
              textAlign="left"
            >
              <Flex>
                <chakra.div>{props.friendName}</chakra.div>
                <Spacer />
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
        </h2>
        <AccordionPanel>
          <RecommendedTracksList
            friendId={props.friendId}
            recommendedTracks={currentPosts}
          />
          <Pagination
            postsPerPage={tracksPerPage}
            totalPosts={list.length}
            paginate={paginate}
          />
        </AccordionPanel>
      </AccordionItem>
      <Flex flexDirection={{ base: "row", md: "row" }}>
        <StatsModal friendScore={score} />
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
    </Flex>
  );
};

export default FCListItem;
