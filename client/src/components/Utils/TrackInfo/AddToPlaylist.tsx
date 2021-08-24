import React from 'react'

import {
Popover,
PopoverTrigger,
Portal,
PopoverHeader,
PopoverContent,
PopoverBody,
PopoverCloseButton,
Box,
Button,
PopoverFooter,
useColorModeValue
} from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
function AddToPlaylist() {
    const bg = useColorModeValue("brand.50", "brand.900");
    return (
      <Popover 
      trigger="hover"
      closeOnBlur={false} placement="left">
        {(props) => (
          <>
            <PopoverTrigger>
              <Button variant="ghost">
                  <AddIcon/>
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent bg={bg}>
                <PopoverHeader>This is the header</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Box>
                    Hello. Nice to meet you! This is the body of the popover
                  </Box>
                </PopoverBody>
                <PopoverFooter>This is the footer</PopoverFooter>
              </PopoverContent>
            </Portal>
          </>
        )}
      </Popover>
    )
  }

export default AddToPlaylist
