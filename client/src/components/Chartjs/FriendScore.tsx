import React from 'react';
import { Pie } from 'react-chartjs-2';

import {
  Box,
  useColorModeValue,
  Link
} from "@chakra-ui/react";

const data = {
  //labels: ['Red', 'Blue'],
  datasets: [
    {
      label: '# of Votes',
      data: [3, 20],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
  
};

const options = {
  animation: {
    duration: 0
  },
  legend: {
    display: false   
  }
}

const FriendScore = () => {
  return(
    <Box 
      
      maxW="100px" 
      maxH="100px"
      color={useColorModeValue('brand.700', 'white')}
      fontWeight='700'
      fontSize='10px'
    >
      Friend score: 96%
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