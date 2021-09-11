import React, {useEffect, useContext} from 'react'
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayed'
import { SimpleGrid, createStandaloneToast } from '@chakra-ui/react'
import Nav from '../Nav/Nav';
import FriendCard from './FriendCards/FriendCard'
import SocketContext from './SocketContext'
import io from 'socket.io-client';
import { UserContext } from '../../contexts/UserContext'
const socket = io();
export const Main = (props: any) => {
  const toast = createStandaloneToast(props.cusTheme);
  const {userObj, refetch} = useContext(UserContext);

  useEffect(() => {
    socket.emit('userConnected', userObj.user_id);
    socket.on('notification', (data: any) => {
      setTimeout(() => {refetch()
        toast({
          title: data.action,
          description: data.message,
          status: data.status || 'info',
          duration: 4000,
          isClosable: true,
        });
      }, 1500);
    });
  }, [])


    return (
      <SocketContext.Provider value={{ socket }}>
        <Nav user={...userObj} toggleFont={props.toggleFont} changeColorTheme={props.changeColorTheme}/>
      <SimpleGrid minChildWidth='400px' spacing='10px'>
        <RecentlyPlayed />
        <FriendCard />
      </SimpleGrid>
    </SocketContext.Provider>
    )
}
export default Main;
