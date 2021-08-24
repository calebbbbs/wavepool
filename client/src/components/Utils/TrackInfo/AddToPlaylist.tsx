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
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';

import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';

const AddToPlaylist = (props: any) => {
  const { userObj } = useContext(UserContext);

  const bg = useColorModeValue('brand.50', 'brand.900');
  const list = props.playlists.map((playlist: any, i: number) => {
    return (
      <MenuItem
        onClick={() => {
          console.log('i got clicked');
          axios
            .get(
              `http://localhost:4000/spotify/addToPlaylist/${userObj.user_id}/${playlist.id}/${props.trackUri}`
            )
            .then((data: any) => data);
        }}
        key={i}
      >
        {playlist.name}
      </MenuItem>
    );
  });
  return (
    <Popover trigger='hover' placement='left'>
      {(props) => (
        <>
          <PopoverTrigger>
            <Button variant='ghost'>
              <AddIcon />
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent bg={bg}>
              <PopoverHeader>Choose A Playlist</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Box>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Playlists
                    </MenuButton>
                    <MenuList>{list && <div> {list}</div>}</MenuList>
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

export default AddToPlaylist;
