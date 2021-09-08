
import React, {useContext} from 'react';
import { Button, chakra, Center, useColorModeValue,Tooltip } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import TrackComp from '../../Utils/Track/TrackComp';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { UserContext } from '../../../contexts/UserContext';
import {gql, useMutation} from '@apollo/client'

const REMOVE_REC = gql`
mutation RemoveRecommendedMutation($removeRecommendedData: RemoveRecommendedInput!) {
  RemoveRecommended(data: $removeRecommendedData)
}
`


const RecommendedTracksList = (props: any) => {
  const {refetch} = useContext(UserContext);
  const [removeRec] = useMutation(REMOVE_REC);
    const bg = useColorModeValue("brand.50", "brand.900");
  const list = props.recommendedTracks.map((e: any, i: number) => {
    console.log(e);
    return (
      <chakra.div bg={ bg } key={i}>
        <Button variant="ghost"
        onClick={() => {
            removeRec({
              variables: {
                removeRecommendedData: {
                  user_id: e.user_id,
                  track_title: e.track_title
                }
              }
            })
            setTimeout(() => {
              refetch();
            }, 1500)
        }}>
        <CloseIcon/>
        </Button>
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
