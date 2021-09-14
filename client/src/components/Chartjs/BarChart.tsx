import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box } from '@chakra-ui/layout';

const GroupedBar = (props: any) => {
  const { graphData } = props;
  const data = {
    labels: graphData[0],
    datasets: [
      {
        label: '# of dislikes',
        data: graphData[1],
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        borderColor: 'rgba(255, 0, 0, 1)',
      },
      {
        label: '# of likes',
        data: graphData[2],
        backgroundColor: 'rgba(33, 0, 255, 0.4)',
        borderColor: 'rgba(33, 0, 255, 0.1)',
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
  
  return (
  <Box>
    <Bar data={data} options={options} />
  </Box>
)
};

export default GroupedBar;