import React, { useContext } from 'react';
import {
  Flex,
  chakra,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
  MenuDivider,
  useColorMode,
  Image,
  Text,
  HStack,
  IconButton,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';
import NotifMenu from './NotifMenu';
import { BiLogOut } from 'react-icons/bi';
import { SunIcon, MoonIcon, SettingsIcon } from '@chakra-ui/icons';
import { UserContext } from '../../contexts/UserContext';
import AudioPlayer from '../Utils/AudioPlayer/AudioPlayer';
import Search from '../Utils/Search/Search';
import AddFriend from '../Utils/AddFriend/AddFriend';
import CreatePlaylist from '../Utils/CreatePlaylist';
import AudioPlayerMobile from '../Utils/AudioPlayer/AudioPlayerMobile';

const Nav = (props: any) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn, currPlayback, userObj }: any = useContext(UserContext);
  return (
    <>
      <chakra.header>
        <Flex alignItems='center' justifyContent='space-between' mx='auto'>
          <Flex m={4}>
            <chakra.a
              href='/'
              title='Choc Home Page'
              display='flex'
              alignItems='center'
            >
              🌊
            </chakra.a>
            <chakra.h1 textStyle='h1.xl' fontWeight='medium' ml='2'>
              WavePool
            </chakra.h1>
          </Flex>
          {currPlayback && (
            <AudioPlayer changeColorTheme={props.changeColorTheme} />
          )}
          <HStack>
            <NotifMenu />
            {currPlayback && <AudioPlayerMobile />}
            <Menu>
              <MenuButton
                m={4}
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='ghost'
              />
              <MenuList
                bg={useColorModeValue('brand.50', 'brand.900')}
                zIndex={2}
              >
                <MenuGroup>
                  {isLoggedIn && (
                    <chakra.div>
                      <MenuItem>
                        {userObj.photo !== 'no photo' && (
                          <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src={userObj.photo}
                            alt='Profile Pic'
                          />
                        )}
                        <Text ml={2}>{userObj.user_name}</Text>
                      </MenuItem>
                      <Search />
                      <AddFriend />
                      <CreatePlaylist />
                    </chakra.div>
                  )}
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                  <MenuItem onClick={props.toggleFont}>
                    <SettingsIcon />
                    <Text ml={2}>Toggle Accessibility Mode</Text>
                  </MenuItem>
                  <MenuItem onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    <Text ml={2}>Change Color Mode</Text>
                  </MenuItem>
                  {isLoggedIn && (
                    <MenuItem>
                      {' '}
                      <Link href='/logout'>
                        <Flex>
                          <BiLogOut size={20} /> <Text ml={2}>Log Out</Text>
                        </Flex>
                      </Link>
                    </MenuItem>
                  )}
                </MenuGroup>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
};

export default Nav;
