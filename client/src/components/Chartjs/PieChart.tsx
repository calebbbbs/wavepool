import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Box } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';

const PieChart = (props: any) => {
  const { graphData, userName, graphName, cusTheme } = props;
  const data = {
    labels: graphData[0],
    datasets: [
      {
        label: '# of Votes',
        data: graphData[1],
        backgroundColor: [
          cusTheme.colors.brand['900'],
          'black',
          cusTheme.colors.brand['700'],
          cusTheme.colors.brand['600'],
          cusTheme.colors.brand['500'],
          'white',
          'green',
          cusTheme.colors.brand['200'],
          cusTheme.colors.brand['100'],
          cusTheme.colors.brand['50'],
        ],
        borderColor: [
          cusTheme.colors.brand['900'],
          'black',
          cusTheme.colors.brand['700'],
          cusTheme.colors.brand['600'],
          cusTheme.colors.brand['500'],
          'white',
          'green',
          cusTheme.colors.brand['200'],
          cusTheme.colors.brand['100'],
          cusTheme.colors.brand['50'],
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        labels: {
          color: useColorModeValue('black', 'white'),
          size: 18,
        },
        title: {
          display: true,
          text: `${userName}'s top 10 ${graphName}:`,
          color: useColorModeValue('black', 'white'),
          fontColor: useColorModeValue('black', 'white'),
          font: {
            color: useColorModeValue('black', 'white'),
            size: 18,
          },
        },
      },
    },
  };

  return (
    <Box maxW='500px' marginBottom='30px'>
      <Pie data={data} options={options} />
    </Box>
  );
};

export default PieChart;
