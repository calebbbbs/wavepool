import React from 'react';
import { Button, chakra, Center } from '@chakra-ui/react';
import TrackComp from '../../Utils/Track/TrackComp';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

const RecommendedTracksList = (props: any) => {
  const list = props.recommendedTracks.map((e: any, i: number) => {
    return (
      <chakra.div key={i}>
        <Center>
          <Button variant='ghost'>
            <FiThumbsUp />
          </Button>
          <Button variant='ghost'>
            <FiThumbsDown />
          </Button>
        </Center>
        <TrackComp track={e} />
      </chakra.div>
    );
  });

  return <div>{list}</div>;
};

export default RecommendedTracksList;
