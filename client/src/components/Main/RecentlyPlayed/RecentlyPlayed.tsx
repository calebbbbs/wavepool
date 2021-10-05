import React, { useContext, useState, useEffect } from 'react';
import Pagination from '../../Utils/Pagination';
import {
  Flex,
  chakra,
  Box,
  Image,
  useColorModeValue,
  useBreakpointValue,
  Link,
  Center,
} from '@chakra-ui/react';
import { UserContext } from '../../../contexts/UserContext';
import RecentlyPlayedList from './RecentlyPlayedList';
import StatsModal from '../../Utils/StatsModal';

export const RecentlyPlayed = () => {
  const { recentPlays, userObj, getRecentlyPlayed } = useContext(UserContext);
  const { user_name } = userObj;

  useEffect(() => {
    const interval = setInterval(() => {
      getRecentlyPlayed();
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  const opts = { base: 2, sm: 3, md: 3, lg: 3, xl: 6 };
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
    <Flex m={4} alignItems='center' justifyContent='center'>
      <Box
        py={4}
        borderRadius='3vh'
        // rounded='lg'
        shadow='lg'
        // bgGradient={useColorModeValue(
        //   'linear(to-t,brand.50, brand.100)',
        //   'linear(to-t,brand.800,brand.500)'
        // )}
        bg={useColorModeValue('brand.100', 'brand.800')}
      >
        <Box mt={2}>
          <Center>
            <Link
              color={useColorModeValue('gray.700', 'white')}
              fontWeight='700'
              _hover={{
                color: useColorModeValue('gray.600', 'gray.200'),
                textDecor: 'underline',
              }}
            >
              Recently Played
            </Link>
          </Center>

          {recentPlays && (
            <chakra.div>
              <RecentlyPlayedList recentPlays={currentPosts} />
              <Pagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                postsPerPage={tracksPerPage || 2}
                totalPosts={recentPlays.length}
                paginate={paginate}
              />
            </chakra.div>
          )}
        </Box>

        <Center m={4}>
          {userObj.photo !== 'no photo' && (
            <Image
              boxSize='2rem'
              borderRadius='full'
              src={userObj.photo}
              alt='Profile Pic'
              mr='12px'
            />
          )}
          <Link
            color={useColorModeValue('gray.700', 'gray.200')}
            fontWeight='700'
            cursor='pointer'
          >
            {userObj.user_name}
          </Link>
          <StatsModal user_id={userObj.user_id} userName={user_name} />
        </Center>
      </Box>
    </Flex>
  );
};

export default RecentlyPlayed;
