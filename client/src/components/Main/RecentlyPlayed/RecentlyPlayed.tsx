import React, { useContext, useState, useEffect } from "react";
import Pagination from "../../Utils/Pagination";
import { Flex, Box, Image, useColorModeValue, useBreakpointValue, Link, Center } from "@chakra-ui/react";
import { UserContext } from "../../../contexts/UserContext";
import RecentlyPlayedList from "./RecentlyPlayedList";

export const RecentlyPlayed = () => {
  const { recentPlays, userObj, getRecentlyPlayed } = useContext(UserContext);

  useEffect(() => {
    const interval = setInterval(() => {
      getRecentlyPlayed();
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  const opts = {base: 2, sm: 3, md: 3, lg: 3, xl: 6}
    const tracksPerPage = useBreakpointValue(opts) || 2;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [currentPosts, setCurrentPosts] = useState<any>([]);
  const indexOfLastPost = currentPage * tracksPerPage;
  const indexOfFirstPost = indexOfLastPost - tracksPerPage;

  useEffect(() => {
    if (recentPlays) {
      setCurrentPosts(recentPlays.slice(indexOfFirstPost, indexOfLastPost));
    }
  }, [JSON.stringify(recentPlays), indexOfLastPost]);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Flex mt={2} width="full" alignItems="center" justifyContent="center">
      <Box
        // mx="auto"
        minW='375px'
        py={4}
        rounded="lg"
        shadow="lg"
        bg={useColorModeValue("brand.100", "brand.800")}
        // maxW="2xl"
      >
        <Box mt={2}>
          <Center>
          <Link
            color={useColorModeValue("gray.700", "white")}
            fontWeight="700"
            _hover={{
              color: useColorModeValue("gray.600", "gray.200"),
              textDecor: "underline",
            }}
          >
            Recently Played
          </Link>
          </Center>
          
          {recentPlays && (
            <div>
              <RecentlyPlayedList recentPlays={currentPosts} />
              <Pagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                postsPerPage={tracksPerPage || 2}
                totalPosts={recentPlays.length}
                paginate={paginate}
              />
            </div>
          )}
        </Box>

          <Center m={4}>
            {userObj.photo !== "no photo" && (
              <Image
                boxSize="2rem"
                borderRadius="full"
                src={userObj.photo}
                alt="Profile Pic"
                mr="12px"
              />
            )}
            <Link
              color={useColorModeValue("gray.700", "gray.200")}
              fontWeight="700"
              cursor="pointer"
            >
              {userObj.user_name}
            </Link>
            </Center>
      </Box>
    </Flex>
  );
};

export default RecentlyPlayed;
