import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Box,
  useColorModeValue,
  Link,
  Text
} from "@chakra-ui/react";



const FriendScore = (props: any) => {
  const {numberOfLikes, totalSongs} = props;
  const dislike = totalSongs - numberOfLikes;
  const data = {
    
    datasets: [
      {
        label: '# of Votes',
        data: [dislike, numberOfLikes],
        backgroundColor: [
          'rgba(255, 0, 0, 0.7)',
          'rgba(33, 0, 255, 0.4)',
        ],
        borderColor: [
          'rgba(255, 0, 0, 1)',
          'rgba(33, 0, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  
  };
  
  const options = {
    responsive: true,
    animation: {
      duration: 0
    },
    legend: {
      display: false
    }
  }
  
  return(
    <Box
      maxW="100px"
      maxH="100px"
      color={useColorModeValue("gray.700", "white")}
      
    >
      {
      totalSongs > 0 && 
        <Text
          fontWeight='700'
          fontSize='10px'
        >Friend score: {Math.trunc((numberOfLikes / totalSongs)*100)}%</Text>
      }
      <Pie
        data={data}
        options={options}
      />
      <Link

        _hover={{
          color: useColorModeValue("brand.600", "brand.200"),
          textDecor: "underline",
        }}
      >

      </Link>
    </Box>
  )
};

export default FriendScore;