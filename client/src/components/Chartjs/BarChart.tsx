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
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: '# of likes',
        data: graphData[2],
        backgroundColor: 'rgb(54, 162, 235)',
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