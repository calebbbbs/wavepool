import React, { useContext, useState } from "react";

import {
  Flex,
  useColorModeValue,
  Box,
  Link,
  Text,
} from "@chakra-ui/react";

import GET_RECOMMENDED_TRACKS from "../../../graphql/queries/GET_RECOMMENDED_TRACKS";

import { useQuery } from "@apollo/client";
import { UserContext } from "../../../contexts/UserContext";

import RecommendedTracksList from "./RecomendedTracksList";

const RecommendedTracks = () => {
  const { userObj } = useContext(UserContext);
  const [seeMore, setSeeMore] = useState(false)
  const { error, data } = useQuery(GET_RECOMMENDED_TRACKS, {
    variables: { getUserUserId: userObj.user_id },
  });
  if(error) console.error(error);
  return (
    <Flex
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("brand.100", "brand.800")}
        maxW="2xl"
      >

        <Box mt={2}>
          <Link
            fontSize="2xl"
            color={useColorModeValue("brand.700", "white")}
            fontWeight="700"
            _hover={{
              color: useColorModeValue("brand.600", "brand.200"),
              textDecor: "underline",
            }}
          >
            Recommended
          </Link>

          {data && data.getUser.recommendedTracks && <div>
          {seeMore ? <RecommendedTracksList recommendedTracks={data.getUser.recommendedTracks}/> :
          <RecommendedTracksList recommendedTracks={data.getUser.recommendedTracks.slice(0, 2)}/>}</div>}
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Link
            color={useColorModeValue("brand.600", "brand.400")}
            _hover={{ textDecor: "underline" }}
            onClick={() => {setSeeMore(!seeMore)}}
          >
            {seeMore ? <Text>See Less</Text>: <Text>See More</Text>}
          </Link>

          <Flex alignItems="center">
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default RecommendedTracks;
