import React, { useContext } from "react";
import {
  Tooltip,
  Flex,
  chakra,
  useColorMode,
  Button,
  HStack,
  Box,
  IconButton,
  useColorModeValue,
  VisuallyHidden,
  useDisclosure,
  CloseButton,
} from "@chakra-ui/react";

import { AiOutlineMenu } from "react-icons/ai";

import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { UserContext } from "../../contexts/UserContext";

import AudioPlayer from "../Utils/AudioPlayer/AudioPlayer";

import Search from "../Utils/Search/Search";

function Nav(props: any) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn, currPlayback }: any = useContext(UserContext);
  const { isOpen, onClose, onOpen } = useDisclosure();
  // return (
  //   <Flex zIndex="2">
  //     <chakra.h1 fontSize="4xl" m={4}>
  //       Wavepool 🌊
  //     </chakra.h1>
  //     <Spacer />
  //     <Tooltip label="Toggle Color Mode">
  //       <Button m={4} variant="ghost" onClick={toggleColorMode}>
  //         {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
  //       </Button>
  //     </Tooltip>
  //     {!isLoggedIn ? (
  //       <div></div>
  //     ) : (
  //       <chakra.div>
  //         <Search />
  //         {/* <AddFriendDrawer/> */}
  //       </chakra.div>
  //     )}
  //     {currPlayback && <AudioPlayer />}
  //   </Flex>
  // );

  return (
    <>
      <chakra.header w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md">
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              🌊
              <VisuallyHidden>WavePool</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              WavePool
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Tooltip label="Toggle Color Mode">
                <Button m={4} variant="ghost" onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Tooltip>
              {!isLoggedIn ? (
                <div></div>
              ) : (
                <chakra.div>
                  <Search />
                  {/* <AddFriendDrawer/> */}
                </chakra.div>
              )}
              {currPlayback && <AudioPlayer />}
            </HStack>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={onOpen}
              />

              <Flex
                pos="absolute"
                top={0}
                right={0}
                display={isOpen ? "flex" : "none"}
                flexDirection="row"
                p={2}
                pb={4}
                m={2}
                mr={6}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton m={4} aria-label="Close menu" onClick={onClose} />

                <Tooltip label="Toggle Color Mode">
                  <Button m={4} variant="ghost" onClick={toggleColorMode}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </Tooltip>
                {!isLoggedIn ? (
                  <div></div>
                ) : (
                  <chakra.div>
                    <Search />
                  </chakra.div>
                )}
                {currPlayback && <AudioPlayer />}
              </Flex>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
}

export default Nav;
