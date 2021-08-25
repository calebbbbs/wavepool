import React from "react";
import { Input, Flex, useColorModeValue } from "@chakra-ui/react";

import axios from "axios";

const querySpotify = (query: string, user_id: string) => {
  return axios.get(`/spotify/query/${user_id}/${query}`).then((data) => {
    return data.data;
  });
};

const SearchInput = (props: any) => {
  const bg = useColorModeValue('brand.50', 'brand.900')
  return (
    <Flex zIndex="1" position="fixed">
      <Input
        bg={bg}
        focusBorderColor={useColorModeValue('brand.400', 'brand.600')}
        variant="filled"
        placeholder="Search Songs"
        onChange={async (e) => {
          if(e.target.value === ''){
            return;
          }
        await props.setSearchQuery(e.target.value);
         await querySpotify(e.target.value, props.userObj.user_id).then(
            (data: any) => {
              if(data){
              return props.setTrackList(data);
              }
            }
          );
        }}

      ></Input>
    </Flex>
  );
};
export default SearchInput;
