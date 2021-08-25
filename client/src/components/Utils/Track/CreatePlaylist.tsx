import React, { useContext } from 'react'
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
  Menu,
  MenuButton,
} from '@chakra-ui/react';

import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';

const CreatePlaylist = (props: any) => {
  const { userObj } = useContext(UserContext);
  const bg = useColorModeValue('brand.50', 'brand.900');
return (
<Popover trigger='hover' placement='left'>
{(props) => (
  <>
    <PopoverTrigger>
      <Button variant='ghost'
        onClick={() => {
        console.log('i got clicked');
        axios
          .get(
          `http://localhost:4000/spotify/createPlaylist/${userObj.user_id}`
        )
        .then((data: any) => data)
          }}
          >
        <AddIcon />
      </Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent bg={bg}>
        <PopoverHeader>Create A Playlist</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Box>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Playlists
              </MenuButton>
              {/* <MenuList>{list && <div> {list}</div>}</MenuList> */}
            </Menu>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Portal>
    </>
)}
</Popover>
);
        };


export default CreatePlaylist
