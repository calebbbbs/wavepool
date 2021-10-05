import React, { useEffect, useContext } from 'react';
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayed';
import { SimpleGrid, createStandaloneToast } from '@chakra-ui/react';
import Nav from './Nav';
import FriendCard from './FriendCards/FriendCard';
import SocketContext from '../../contexts/SocketContext';
import io from 'socket.io-client';
import { UserContext } from '../../contexts/UserContext';
import { GraphContextProvider } from '../../contexts/GraphContext';

const socket = io();

export const Main = (props: any) => {
  const toast = createStandaloneToast(props.cusTheme);
  const { userObj, refetch } = useContext(UserContext);

  useEffect(() => {
    socket.emit('userConnected', userObj.user_id);
    socket.on('notification', async (data: any) => {
      await new Promise((resolve) =>
        setTimeout((resolve) => {
          refetch();
          toast({
            title: data.action,
            description: data.message,
            position: 'top-left',
            status: data.status || 'info',
            duration: 4000,
            isClosable: true,
          });
        }, 10)
      );
    });
  }, []);

  return (
    <GraphContextProvider>
      <SocketContext.Provider value={{ socket }}>
        <Nav
          user={...userObj}
          toggleFont={props.toggleFont}
          changeColorTheme={props.changeColorTheme}
        />
        <SimpleGrid minChildWidth='350px' spacing='10px'>
          <RecentlyPlayed />
          <FriendCard />
        </SimpleGrid>
      </SocketContext.Provider>
    </GraphContextProvider>
  );
};
export default Main;
