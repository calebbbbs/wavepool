import React from 'react';
import { Pie } from 'react-chartjs-2';

import {
  Box
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

const FriendScore = () => (
  <Box maxW="75px">
    <Pie data={data} options={options}/>
  </Box>
);

export default FriendScore;