import React from "react";
import { Input, Flex, Button } from "@chakra-ui/react";

const SearchInput = (props: any) => {

    return (
    <Flex>
    <Input placeholder="Search Songs" onChange={(e) => {
        props.setSearchQuery(e.target.value)
    }} value={props.query}></Input>
    <Button onClick={() => {

    }}>Search</Button>
    </Flex>)
}
export default SearchInput