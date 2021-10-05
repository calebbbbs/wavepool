import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Box, useColorModeValue, Link, Text } from '@chakra-ui/react';

const FriendScore = (props: any) => {
  const { numberOfLikes, totalSongs } = props;
  const dislike = totalSongs - numberOfLikes;
  const data = {
    datasets: [
      {
        label: '# of Votes',
        data: [dislike, numberOfLikes],
        backgroundColor: ['rgba(0, 0, 0, 0.0)', 'rgba(255, 255, 255, 1)'],
        borderColor: useColorModeValue(
          'rgba(0, 0, 0, 0.0)',
          'rgba(255, 255, 255, 0)'
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 0,
    },
    legend: {
      display: false,
    },
  };

  return (
    <Box
      maxW='100px'
      maxH='100px'
      color={useColorModeValue('gray.700', 'white')}
      mb='25px'
    >
      {totalSongs > 0 && (
        <Text fontWeight='700' fontSize='10px'>
          Friend score: {Math.trunc((numberOfLikes / totalSongs) * 100)}%
        </Text>
      )}
      <Pie data={data} options={options} />
      <Link
        _hover={{
          color: useColorModeValue('brand.600', 'brand.200'),
          textDecor: 'underline',
        }}
      ></Link>
    </Box>
  );
};

export default FriendScore;
