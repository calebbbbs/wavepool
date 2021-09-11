import React, {useEffect, useContext} from 'react'
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayed'
import { SimpleGrid, useToast } from '@chakra-ui/react'
import Nav from '../Nav/Nav';
import FriendCard from './FriendCards/FriendCard'
import SocketContext from './SocketContext'
import io from 'socket.io-client';
import { UserContext } from '../../contexts/UserContext'
const socket = io();
export const Main = (props: any) => {
  const toast = useToast();
  const {userObj, refetch} = useContext(UserContext);

  useEffect(() => {
    socket.emit('userConnected', userObj.user_id);
    socket.on('notification', async (data: any) => {
      await new Promise(resolve => setTimeout(resolve => {refetch()
        toast({
          title: data.action,
          description: data.message,
          status: data.status || 'info',
          duration: 4000,
          isClosable: true,
        });
      }, 10));
    });
  }, []);


    return (
      <SocketContext.Provider value={{ socket }}>
        <Nav user={...userObj} toggleFont={props.toggleFont}/>
      <SimpleGrid minChildWidth='350px' spacing='80px'>
        <RecentlyPlayed />
        <FriendCard />
      </SimpleGrid>
    </SocketContext.Provider>
    )
}
export default Main;
