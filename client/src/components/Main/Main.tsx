import React from 'react'
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayed'
import { SimpleGrid } from '@chakra-ui/react'
export const Main = () => {
    return (
        <SimpleGrid columns={[1, null, 2]} spacing="40px">
          <RecentlyPlayed/>
          <RecentlyPlayed/>
        </SimpleGrid>
    )
}
export default Main;
