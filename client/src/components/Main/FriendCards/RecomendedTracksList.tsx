
import React from 'react';
import { Button, chakra, Center, useColorModeValue,Tooltip } from '@chakra-ui/react';
import TrackComp from '../../Utils/Track/TrackComp';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

const RecommendedTracksList = (props: any) => {
    const bg = useColorModeValue("brand.50", "brand.900");
  const list = props.recommendedTracks.map((e: any, i: number) => {
    return (
      <chakra.div bg={ bg } key={i}>
        <Center>
            <Tooltip placement="left" label="Like">
          <Button variant='ghost'>
            <FiThumbsUp />
          </Button>
          </Tooltip>
          <Tooltip placement="right" label="Dislike">
          <Button variant='ghost'>
            <FiThumbsDown />
          </Button>
          </Tooltip>
        </Center>
        <TrackComp track={e} />
      </chakra.div>
    );
  });

  return <div>{list}</div>;
};

export default RecommendedTracksList;