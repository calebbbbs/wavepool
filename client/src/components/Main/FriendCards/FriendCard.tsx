import React, { useContext } from 'react';

import {
  Flex,
  useColorModeValue,
  Box,
  chakra,
  Link,
  Center,
  Accordion,
} from '@chakra-ui/react';

import { UserContext } from '../../../contexts/UserContext';
import FCListItem from './FCListItem';

const RecommendedTracks = (props: any) => {
  const { userObj } = useContext(UserContext);
  const { friends } = userObj;

  const list = friends.map((friend: any, i: number) => {
    return (
      <FCListItem
        cusTheme={props.cusTheme}
        totalSongs={friend.number_of_songs}
        numberOfLikes={friend.number_of_likes}
        friendScore={friend.friend_score}
        key={i}
        userObj={userObj}
        friendId={friend.friend_id}
        friendPhoto={friend.friend_photo}
        friendName={friend.friend_name}
        friendStatus={friend.friend_status}
        // loggedIn={friend.logged_in}
      />
    );
  });

  return (
    <Flex mt={2} alignItems='center' justifyContent='center'>
      <Box
        minW='340'
        // minW='315'
        rounded='lg'
        shadow='lg'
        bg={useColorModeValue('brand.100', 'brand.800')}
        py={4}
      >
        <Box mt={2}>
          <Center>
            <Link
              color={useColorModeValue('gray.700', 'white')}
              fontWeight='700'
              m={4}
              _hover={{
                color: useColorModeValue('brand.600', 'brand.200'),
                textDecor: 'underline',
              }}
            >
              Recommended
            </Link>
          </Center>
          <chakra.div>
            <Accordion allowMultiple allowToggle>
              {list}
            </Accordion>
          </chakra.div>
        </Box>
      </Box>
    </Flex>
  );
};

export default RecommendedTracks;
