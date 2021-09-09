import React, {useEffect, useContext} from 'react'
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayed'
import { SimpleGrid, useToast } from '@chakra-ui/react'
import Nav from '../Nav/Nav';
// import RecommendedTracks from './RecommendedTracks/RecommendedTracks'
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
    socket.on('updateRecs', (friendId: string) => {

      setTimeout(() => {refetch()
        toast({
          title: 'New Track!',
          description: `${friendId} sent you a track!`,
          status: 'info',
          duration: 4000,
          isClosable: true,
        });
      }, 1500);
    });

    socket.on('updateFriends', (friendId: string) =>{
      setTimeout(() => {refetch()
        toast({
          title: 'New Friend Request!',
          description: `${friendId} sent you a friend request!`,
          status: 'info',
          duration: 4000,
          isClosable: true,
        });
      }, 1500);
    });

    socket.on('friendConfirmed', (friendId: string) =>{
      setTimeout(() => {refetch()
        toast({
          title: 'New Friend!',
          description: `${friendId} confirmed your friend request!`,
          status: 'info',
          duration: 4000,
          isClosable: true,
        });
      }, 1500);
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
