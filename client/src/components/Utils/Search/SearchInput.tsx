import React, {useState} from "react";
import { Input, Flex, useColorModeValue, Button } from "@chakra-ui/react";

import axios, {AxiosError} from "axios";

const querySpotify = (query: string, user_id: string) => {
  return axios.get(`/spotify/query/${user_id}/${query}`).then(({data}) => {
    return data;
  }).catch((error: AxiosError) => console.log('Error from querySpotify, SearchInput.tsx', error.response?.data));
};



const SearchInput = (props: any) => {
  const bg = useColorModeValue('brand.50', 'brand.900')
  const [query, setQuery] = useState('');



  const handleSearch = async () => {
    if(query === ''){
      return;
    }
  await props.setSearchQuery(query);
   await querySpotify(query, props.userObj.user_id).then(
      (data: any) => {
        if(data){
        return props.setTrackList(data);
        }
      }
    );
  }

  const handleKeypress = (e: any) => {
    //it triggers by pressing the enter key
  if (e.keyCode === 13) {
    handleSearch();
  }
  };


  return (
    <Flex zIndex="1" position="fixed">
      <Input
        w="90%"
        bg={bg}
        focusBorderColor={useColorModeValue('brand.400', 'brand.600')}
        variant="filled"
        placeholder="Search Songs"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyPress={handleKeypress}
      ></Input>
      <Button  onClick={handleSearch}
>Search</Button>
    </Flex>
  );
};
export default SearchInput;
