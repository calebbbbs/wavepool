import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Box } from '@chakra-ui/layout';
const rand = () => Math.round(Math.random() * 20 - 10);

const data = {
  datasets: [
    {
      label: 'A dataset',
      data: [
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
        { x: rand(), y: rand() },
      ],
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

const options = {
  responsive: true,

  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  animation: {
    duration: 0
  }
};

const ScatterChart = () => (
  <Box>
    <Scatter data={data} options={options} />
  </Box>
);

export default ScatterChart;