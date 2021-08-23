import React, { useContext, useState } from "react";

import {
  Flex,
  useColorModeValue,
  Box,
  Link,
  Text,
} from "@chakra-ui/react";

import { useQuery, gql } from "@apollo/client";
import { UserContext } from "../../../contexts/UserContext";

import RecommendedTracksList from "./RecomendedTracksList";

const GET_RECOMMENDED_TRACKS = gql`
  query Query($getUserUserId: String!) {
    getUser(user_id: $getUserUserId) {
      recommendedTracks {
        user_id
        friend_id
        friend_name
        track_title
        spotify_uri
        artists
        album_art
        album_title
      }
    }
  }
`;

const RecommendedTracks = () => {
  const { userObj } = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_RECOMMENDED_TRACKS, {
    variables: { getUserUserId: userObj.user_id },
  });
  const [seeMore, setSeeMore] = useState(false)
  if (error) console.error(error);
  if (loading) return <p>Loading ...</p>;
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
        bg={useColorModeValue("brand.100", "brand.700")}
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

          {data.getUser.recommendedTracks && <div>
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
