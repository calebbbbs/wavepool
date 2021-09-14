import React, { useContext } from "react";

import {
  Flex,
  useColorModeValue,
  Box,
  Link,
  Accordion,
} from "@chakra-ui/react";

import { UserContext } from "../../../contexts/UserContext";
import FCListItem from "./FCListItem";


const RecommendedTracks = () => {
  const { userObj } = useContext(UserContext);
  const { friends } = userObj;

  const list = friends.map((friend: any, i: number) => {
    return (
      <FCListItem
        totalSongs={friend.number_of_songs}
        friendScore={friend.friend_score}
        key={i}
        userObj={userObj}
        friendId={friend.friend_id}
        friendPhoto={friend.friend_photo}
        friendName={friend.friend_name}
        friendStatus={friend.friend_status}
      />
    );
  });

  return (
    <Flex minX="300px" alignItems="center" justifyContent="center">
      <Box
        mx="auto"
        px={8}
        // py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("brand.100", "brand.800")}
        maxW="2xl"
      >  
          <Box mt={2}
          >
            
            <Link
              color={useColorModeValue("gray.700", "white")}
              fontWeight='700'
              _hover={{
                color: useColorModeValue("brand.600", "brand.200"),
                textDecor: "underline",
              }}
            >
              Recommended
            </Link>
              <div>
                <Accordion minW="300" allowMultiple allowToggle>
                  {list}
                </Accordion>
              </div>

          </Box>
        
      </Box>
    </Flex>
  );
};

export default RecommendedTracks;
