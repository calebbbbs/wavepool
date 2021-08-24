import React from "react";
import { Input, Flex, Button } from "@chakra-ui/react";



import axios from 'axios';

const querySpotify = (query: string, user_id: string) => {
  return axios.get(`/spotify/query/${user_id}/${query}`).then((data) => {
    console.log(data);
    return data.data;
  })
 }

const SearchInput = (props: any) => {
  return (
    <Flex zIndex="1" position="fixed">
      <Input
        variant="filled"
        placeholder="Search Songs"
        onChange={(e) => {
          props.setSearchQuery(e.target.value);
        }}
        value={props.query}
      ></Input>
      <Button
        onClick={() => {
          querySpotify(props.query, props.userObj.user_id).then(
            (data: any) => {
              props.setTrackList(data);
            }
          );
        }}
      >
        Search
      </Button>
    </Flex>
  );
};
export default SearchInput;
