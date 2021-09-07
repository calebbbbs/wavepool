import React, { useContext } from 'react';
import {
  Tooltip,
  Flex,
  chakra,
  useColorMode,
  Button,
  HStack,
  Box,
  IconButton,
  Link,
  useColorModeValue,
  VisuallyHidden,
  useDisclosure,
  CloseButton,
  useToast,
} from '@chakra-ui/react';

import { AiOutlineMenu } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { SunIcon, MoonIcon, AtSignIcon } from '@chakra-ui/icons';
import { UserContext } from '../../contexts/UserContext';

import AudioPlayer from '../Utils/AudioPlayer/AudioPlayer';
import AudioPlayerMobile from '../Utils/AudioPlayer/AudioPlayerMobile';
import Search from '../Utils/Search/Search';

import AddFriend from '../Utils/AddFriend/AddFriend';

import CreatePlaylist from './CreatePlaylist';

const Nav = (props: any) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn, currPlayback }: any = useContext(UserContext);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const toast = useToast();


  return (
    <>
      <chakra.header
        zIndex='2'
        bg='blackAlpha.50'
        w='full'
        px={{ base: 2, sm: 4 }}
      >
        <Flex alignItems='center' justifyContent='space-between' mx='auto'>
          <Flex>
            <chakra.a
              href='/'
              title='Choc Home Page'
              display='flex'
              alignItems='center'
            >
              🌊
              <VisuallyHidden>WavePool</VisuallyHidden>
            </chakra.a>
            <chakra.h1 textStyle='h1.xl' fontWeight='medium' ml='2'>
              WavePool
            </chakra.h1>
          </Flex>
          {currPlayback && <AudioPlayer />}
          <HStack display='flex' alignItems='center' spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color='brand.500'
              display={{ base: 'none', md: 'inline-flex' }}
            >
              <Tooltip label="Toggle Color Mode">
                <Button variant="ghost" onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Tooltip>
              {!isLoggedIn ? (
                <div></div>
              ) : (
                <chakra.div>
                  <Search />
                  <AddFriend/>
                  <CreatePlaylist/>
                  
                  {/* <AddFriendDrawer/> */}
                  <Link href="/logout">
                    <Tooltip label="Log Out">
                      <Button variant="ghost">
                        <BiLogOut size={25}/>
                      </Button>
                    </Tooltip>
                  </Link>
                </chakra.div>
              )}
            </HStack>
            <Box display={{ base: 'inline-flex', md: 'none' }}>
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label='Open menu'
                fontSize='20px'
                color={useColorModeValue('gray.800', 'inherit')}
                variant='ghost'
                icon={<AiOutlineMenu />}
                onClick={onOpen}
              />
              <Flex
                pos='absolute'
                top={0}
                right={0}
                display={isOpen ? 'flex' : 'none'}
                flexDirection='row'
                p={2}
                pb={4}
                m={2}
                mr={6}
                spacing={3}
                rounded='sm'
              >
                <CloseButton m={4} aria-label='Close menu' onClick={onClose} />
                {currPlayback && <AudioPlayerMobile />}
                <Tooltip label='Toggle Color Mode'>
                  <Button m={4} variant='ghost' onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </Tooltip>
                <Tooltip label='Notifications'>
                  <Button
                    m={4}
                    variant='ghost'
                    onClick={() => {
                      //   setToastMessage({
                      //   title:  "Notifications",
                      //   body: `You have new notifications, ${userObj.user_name}`,
                      // });
                      // setToastMessage(undefined);
                      toast({
                        title: 'Recommendations',
                        description: 'New tracks from',
                        status: 'success',
                        duration: 4500,
                        isClosable: true,
                      });
                    }}
                  >
                    <AtSignIcon />
                  </Button>
                </Tooltip>

                {!isLoggedIn ? (
                  <div></div>
                ) : (
                  <chakra.div>
                    <Search />
                    <AddFriend/>
                    <CreatePlaylist/>
                    <Tooltip label="Log Out">
                      <Link href="/logout">
                        <Button variant="ghost">
                          <BiLogOut size={25}/>
                        </Button>
                      </Link>
                    </Tooltip>
                  </chakra.div>
                )}
              </Flex>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
}

export default Nav;
