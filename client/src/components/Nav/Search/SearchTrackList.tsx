import React from 'react'
import SearchTrackListItem from './SearchTrackListItem'
// import { chakra } from '@chakra-ui/system'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const SearchTrackList = (props: any) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
    const list = props.trackList.map((e: any, i: Number) => {
      return  <SearchTrackListItem track={e} key={i}/>
    })

    return (<Carousel 
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      keyBoardControl={true}
      // partialVisible={true}
      centerMode={true}
      renderDotsOutside={true}
      transitionDuration={500}
      // containerClass="carousel-container"
      // removeArrowOnDeviceType={["tablet", "mobile"]}
      // dotListClass="custom-dot-list-style"
      // itemClass="carousel-item-padding-80-px"
    >{list}</Carousel>)
}

export default SearchTrackList