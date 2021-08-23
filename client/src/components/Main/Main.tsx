import React from 'react'
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayed'
import UserPlaylists from './UserPlaylists/UserPlaylists'
import { SimpleGrid } from '@chakra-ui/react'
import RecommendedTracks from './RecommendedTracks/RecommendedTracks'
export const Main = () => {
    return (
        <SimpleGrid columns={[1, null, 2]} spacing="40px">
          <RecentlyPlayed/>
          <RecommendedTracks/>
          <UserPlaylists/>
        </SimpleGrid>
    )
}
export default Main;
