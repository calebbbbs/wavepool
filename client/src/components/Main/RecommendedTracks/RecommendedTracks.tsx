import React, { useContext } from "react";

import {
  Flex,
  useColorModeValue,
  Box,
  chakra,
  Link,
  Image,
} from "@chakra-ui/react";

import { useQuery, gql } from "@apollo/client";
import { UserContext } from "../../../contexts/UserContext";
const GET_RECOMMENDED_TRACKS = gql`
  query Query($getUserUserId: String!) {
    getUser(user_id: $getUserUserId) {
      recommendedTracks {
        user_id
        track_id
        friend_id
        spotify_uri
        artists
        album_id
        album_uri
      }
    }
  }
`;

const RecommendedTracks = () => {
  
  const { userObj } = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_RECOMMENDED_TRACKS, {
    variables: { getUserUserId: userObj.user_id },
  });
  if (error) console.error(error);
  if (loading) return <p>Loading ...</p>;
  console.log(data);
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        mx="auto"
        px={8}
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
        maxW="2xl"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Mar 10, 2019
          </chakra.span>
        </Flex>

        <Box mt={2}>
          <Link
            fontSize="2xl"
            color={useColorModeValue("gray.700", "white")}
            fontWeight="700"
            _hover={{
              color: useColorModeValue("gray.600", "gray.200"),
              textDecor: "underline",
            }}
          >
            Recommended Tracks
          </Link>
          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
            This is where the recommended tracks will go
          </chakra.p>
        </Box>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Link
            color={useColorModeValue("brand.600", "brand.400")}
            _hover={{ textDecor: "underline" }}
          >
            Read more
          </Link>

          <Flex alignItems="center">
            <Image
              mx={4}
              w={10}
              h={10}
              rounded="full"
              fit="cover"
              display={{ base: "none", sm: "block" }}
              src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
              alt="avatar"
            />
            <Link
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
            >
              UserName
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default RecommendedTracks;
