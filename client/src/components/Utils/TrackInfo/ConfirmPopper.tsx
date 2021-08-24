import React from 'react'

import {Popover,
PopoverTrigger,
Button,
useColorModeValue,
PopoverContent,
PopoverHeader,
PopoverArrow,
PopoverCloseButton,
PopoverBody,
Center} from '@chakra-ui/react'

import { RiMailSendLine } from 'react-icons/ri'
const ConfirmPopper = () => {
  const bg = useColorModeValue('brand.50', 'brand.900')
    return (
      <Popover 
      trigger="hover"
      placement="left">
        <PopoverTrigger>
          <Button variant="ghost">
            <RiMailSendLine />
          </Button>
        </PopoverTrigger>
        <PopoverContent bg={bg}>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to send this track?
            <Center>
              <Button colorScheme="green">Yeah!</Button>
            </Center>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
}

export default ConfirmPopper
