import React from 'react'
import SearchTrackListItem from './SearchTrackListItem'
import { chakra } from '@chakra-ui/system'
const SearchTrackList = (props: any) => {

    const list = props.trackList.map((e: any, i: Number) => {
      return  <SearchTrackListItem track={e} key={i}/>
    })

    return (<chakra.div
    mt={12}
    >{list}</chakra.div>)
}

export default SearchTrackList