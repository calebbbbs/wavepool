import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../contexts/UserContext';

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
  useColorModeValue,
  Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
function AddToPlaylist(props: any) {
  const { userObj } = useContext(UserContext);
  const bg = useColorModeValue('brand.50', 'brand.900');
  return (
    <Popover closeOnBlur={false} placement='left'>
      {(props) => (
        <>
          <PopoverTrigger>
            <Button
              variant='ghost'
              onClick={() => {
                axios
                  .get(
                    `http://localhost:4000/spotify/userPlaylists/${userObj.user_id}`
                  )
                  .then((data) => data)
                  .catch((err) => console.log(err));
              }}
            >
              <AddIcon />
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent bg={bg}>
              <PopoverHeader>Choose A Playlist</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Box>
                  <Select placeholder='Select Playlist'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}

export default AddToPlaylist;
