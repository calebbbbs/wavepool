import React from "react";
import { Box, chakra, useColorModeValue, Flex, Center } from "@chakra-ui/react";
import LoginButton from "./LoginButton";
const Welcome = () => {
  const bg = useColorModeValue("brand.100", "brand.900");
  return (
    <Flex bg={bg} px={4} py={32} mx="auto">
      <Box mx="auto" w={{ lg: 8 / 12, xl: 5 / 12 }}>
        <chakra.h1
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          letterSpacing="tight"
          lineHeight="short"
          fontWeight="extrabold"
          color={useColorModeValue("gray.900", "white")}
        >
          <chakra.span display={{ base: "block", xl: "inline" }}>
            Share music with your friends.{" "}
          </chakra.span>
          <br />
          <chakra.span
            display={{ base: "block", xl: "inline" }}
            color={useColorModeValue("brand.400", "brand.400")}
          >
            Know when they listen.
          </chakra.span>
        </chakra.h1>
        <chakra.p mb={5} color="gray.500" fontSize={{ md: "lg" }}>
          Wavepool is a spotify companion web application designed to bring the
          native social aspect back to your spotify experience. Get a suggestion
          from a friend, drop it in your queue, and let them know if you liked
          it!
        </chakra.p>

        <Center>
          <LoginButton />
        </Center>
      </Box>
    </Flex>
  );
};

export default Welcome;
