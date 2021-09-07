import React, { useContext, useState } from 'react';

import {
  Flex,
  useColorModeValue,
  Box,
  Link,
  Accordion,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import { UserContext } from '../../../contexts/UserContext';
import FCListItem from './FCListItem';
// import FriendStat from "../../Nav/FriendStat";

const RecommendedTracks = () => {
  const { userObj } = useContext(UserContext);
  const { friends } = userObj;
  const [seeMore, setSeeMore] = useState(false);

  const list = friends.map((friend: any, i: number) => {
    return (
      <FCListItem
        key={i}
        userObj={userObj}
        friendId={friend.friend_id}
        friendName={friend.friend_name}
        friendStatus={friend.friend_status}
      />
    );
  });

  return (
    <Flex p={50} w='full' alignItems='center' justifyContent='center'>
      <Box
        mx='auto'
        px={8}
        py={4}
        rounded='lg'
        shadow='lg'
        bg={useColorModeValue('brand.100', 'brand.800')}
        maxW='2xl'
      >
        <Box mt={2}>
          <Link
            fontSize='2xl'
            color={useColorModeValue('brand.700', 'white')}
            fontWeight='700'
            _hover={{
              color: useColorModeValue('brand.600', 'brand.200'),
              textDecor: 'underline',
            }}
          >
            Recommended
          </Link>
          <div>
            <Accordion minW='500px' allowMultiple allowToggle>
              {list}
            </Accordion>
          </div>
        </Box>

        <Flex justifyContent='space-between' alignItems='center' mt={4}>
          <Link
            _hover={{ textDecor: 'underline' }}
            onClick={() => {
              setSeeMore(!seeMore);
            }}
          >
            {seeMore ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Link>

          <Flex alignItems='center'></Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default RecommendedTracks;
