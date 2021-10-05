import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
const GroupedBar = (props: any) => {
  const { graphData } = props;
  const data = {
    labels: graphData[0],
    datasets: [
      {
        label: '# of dislikes',
        data: graphData[1],
        backgroundColor: 'red',
        borderColor: 'red',
      },
      {
        label: '# of likes',
        data: graphData[2],
        backgroundColor: 'green',
        borderColor: 'green',
      },
    ],
  };

  const options = {
    responsive: true,
    animation: false,
    plugins: {
      // 'legend' now within object 'plugins {}'
      legend: {
        labels: {
          color: useColorModeValue('black', 'white'), // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 18, // 'size' now within object 'font {}'
          },
        },
      },
    },
    scales: {
      y: {
        // not 'yAxes: [{' anymore (not an array anymore)
        ticks: {
          color: useColorModeValue('black', 'white'), // not 'fontColor:' anymore
          font: {
            size: 18, // 'size' now within object 'font {}'
          },
          stepSize: 1,
          beginAtZero: true,
        },
      },
      x: {
        // not 'xAxes: [{' anymore (not an array anymore)
        ticks: {
          color: useColorModeValue('black', 'white'), // not 'fontColor:' anymore
          //fontSize: 14,
          font: {
            size: 14, // 'size' now within object 'font {}'
          },
          stepSize: 1,
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <Box>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default GroupedBar;
