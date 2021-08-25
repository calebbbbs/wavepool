import React from 'react'

import {
Button,
Tooltip
// useColorModeValue,
} from '@chakra-ui/react'

import { RiMailSendLine } from 'react-icons/ri'
const ConfirmSend = () => {
  // const bg = useColorModeValue('brand.50', 'brand.900');

    return (
      <Tooltip placement="right" label="Send Track">
          <Button variant="ghost">
            <RiMailSendLine />
          </Button>
          </Tooltip>
    )
}

export default ConfirmSend
