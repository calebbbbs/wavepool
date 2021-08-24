import React from 'react'
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayed'
import { SimpleGrid } from '@chakra-ui/react'
import RecommendedTracks from './RecommendedTracks/RecommendedTracks'

export const Main = () => {
    return (
        <SimpleGrid minChildWidth="350px" spacing="80px">
          <RecentlyPlayed/>
          <RecommendedTracks/>
        </SimpleGrid>
    )
}
export default Main;
