import React from "react";
import { Button, Flex, Center } from "@chakra-ui/react";
const Pagination = (props: any) => {
  const { postsPerPage, setCurrentPage, totalPosts, paginate, currentPage } =
    props;
  const pageNumbers: any = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const list = pageNumbers.map((number: number, i: number) => {
      if(i === currentPage - 1){
          return <Button
          colorScheme="white"
          key={number}
          onClick={() => {
            paginate(number);
          }}
        >
          {number.toString()}
        </Button>
      }
    if (currentPage >= 5 && i === 2) {
      return <div key={number}>...</div>;
    } else if (
      // i === currentPage + 1 ||
      // i === currentPage - 3 ||
    //   i === currentPage + 2 ||
      i === currentPage - 2 ||
      i === currentPage ||
      i === pageNumbers.length - 1 ||
      i === 0
    ) {
      return (
        <Button
          variant="ghost"
          key={number}
          onClick={() => {
            paginate(number);
          }}
        >
          {number.toString()}
        </Button>
      );
    }
    if (currentPage <= pageNumbers.length - 4 && i === pageNumbers.length - 3) {
      return <div key={number}>...</div>;
    }

    return;
  });

  return (
    <Center>
      <Flex>
       {pageNumbers.length >= 5 && <Button 
       onClick={() => {
            if(currentPage > 1){
            setCurrentPage(currentPage - 1)
            }
        }}>Prev</Button>}
        {list}
        {pageNumbers.length >= 5 && <Button 
        onClick={() => {
                        if(currentPage < pageNumbers.length){
                            setCurrentPage(currentPage + 1)
                            }
        }}>Next</Button>}
      </Flex>
    </Center>
  );
};

export default Pagination;
