import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Box } from '@chakra-ui/layout';




const PieChart = (props: any) => {
  const {graphData, userName, graphName} = props;
  const data = {
    labels: graphData[0],
    datasets: [
      {
        label: '# of Votes',
        data: graphData[1],
        backgroundColor: [
          'rgba(255, 0, 0, 0.7)',
          'rgba(255, 0, 38, 0.7)',
          'rgba(255, 0, 63, 0.7)',
          'rgba(255, 0, 88, 0.7)',
          'rgba(255, 0, 114, 0.7)',
          'rgba(244, 0, 143, 0.7)',
          'rgba(222, 0, 173, 0.6)',
          'rgba(190, 0, 202, 0.5)',
          'rgba(142, 0, 230, 0.4)',
          'rgba(33, 0, 255, 0.4)',
        ],
        borderColor: [
          'rgba(20, 20, 20, 1)',
          'rgba(20, 20, 20, 1)',
          'rgba(20, 20, 20, 1)',
          'rgba(20, 20, 20, 1)',
          'rgba(20, 20, 20, 1)',
          'rgba(20, 20, 20, 1)',
          'rgba(20, 20, 20, 1)',
          'rgba(20, 20, 20, 1)',
          'rgba(20, 20, 20, 1)',
          'rgba(20, 20, 20, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        title: {
          display: true,
          text: `${userName}'s top 10 ${graphName}:`,
          font: {
            size: 18,
            style: 'underlined'
          }
        }
      }
    },
    animation: {
        duration: 0
      }
    }

  return (
    <Box minW='500px' marginBottom="30px">
      <Pie data={data} options={options}/>
    </Box>
  )
};

export default PieChart;