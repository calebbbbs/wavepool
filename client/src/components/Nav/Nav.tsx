import React, { useContext } from "react";
import {
  Tooltip,
  Flex,
  chakra,
  useColorMode,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { UserContext } from "../../contexts/UserContext";

import AudioPlayer from "../Utils/AudioPlayer/AudioPlayer";

import Search from "../Utils/Search/Search";

function Nav(props: any) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn, currPlayback }: any = useContext(UserContext);

  return (
    <Flex
    zIndex="2"
    >
      <chakra.h1 fontSize="4xl" m={4}>
        Wavepool 🌊
      </chakra.h1>
      <Spacer />
        <Tooltip label="Toggle Color Mode">
      <Button m={4} variant="ghost" onClick={toggleColorMode}>
        {colorMode === "light" ? (
            <MoonIcon />
            ) : (
            <SunIcon />
        )}
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
    </Flex>
  );

  
}

export default Nav;
