import React from 'react'
import {  Button, HStack, Center } from '@chakra-ui/react';
const Pagination = (props: any) => {
    const {postsPerPage, totalPosts, paginate} = props;
    const pageNumbers: any = [];
    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
        pageNumbers.push(i);
    }

    const list = pageNumbers.map((number: number) => {
           return ( <Button variant="ghost" key={number} onClick={() => {
                paginate(number);
            }}>
                {number.toString()}
            </Button>)
    });

    return (
        <Center>
            <HStack>
                {list}
            </HStack>
            </Center>
    )
}

export default Pagination
