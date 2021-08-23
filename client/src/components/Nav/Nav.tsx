import React, { useContext } from "react";
import LoginButton from "./LoginButton";
import { Flex, Spacer, chakra, useColorMode, Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { UserContext } from "../../contexts/UserContext";

import AudioPlayer from "../Utils/AudioPlayer/AudioPlayer";

import AddFriendDrawer from "./AddFriendDrawer";

import Search from "../Utils/Search/Search";

function Nav(props: any) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn, currPlayback }: any = useContext(UserContext);

  return (
    <Flex>
      <chakra.h1 fontSize="4xl" m={4}>
        Wavepool 🌊
      </chakra.h1>
      <Spacer />
      <Button m={4} variant="ghost" onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
      {!isLoggedIn ? (
        <LoginButton />
        ) : (
          <chakra.div>
          <Search />
          <AddFriendDrawer/>
        </chakra.div>
      )}
      {currPlayback && <AudioPlayer />}
    </Flex>
  );
}

export default Nav;
