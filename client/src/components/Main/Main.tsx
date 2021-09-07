import React, { useContext, useEffect } from 'react';
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayed';
import { SimpleGrid, useToast } from '@chakra-ui/react';
// import RecommendedTracks from './RecommendedTracks/RecommendedTracks'
import FriendCard from './FriendCards/FriendCard';
import io from 'socket.io-client';
import { UserContext } from '../../contexts/UserContext';




const socket = io();
export const Main = () => {
  const { userObj, refetch } = useContext(UserContext);
  const toast = useToast();

  const connectUserToSocket = () => {
    const userId = userObj.user_id; // Retrieve userId
    socket.emit('userConnected', userId);
  };
  interface SocketContextInterface {
    socket: any;
  }

  const SocketContext = React.createContext<SocketContextInterface>({
    socket: null,
  });

  useEffect(() => {
    socket.on('updateRecs', (friendId: string) => {
      toast({
        title: 'New Track!.',
        description: `${friendId} sent you a track!`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      refetch();
    });
    connectUserToSocket();
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      <SimpleGrid minChildWidth='350px' spacing='80px'>
        <RecentlyPlayed />
        <FriendCard />
      </SimpleGrid>
    </SocketContext.Provider>
  );
};
export default Main;
