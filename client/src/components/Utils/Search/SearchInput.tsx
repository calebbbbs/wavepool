import React from "react";
import { Input, Flex, Button } from "@chakra-ui/react";
import querySpotify from "./searchHelpers";
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
          querySpotify(props.query, props.userObj.access_token).then(
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
