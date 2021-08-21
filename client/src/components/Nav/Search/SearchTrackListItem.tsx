import React, {useContext} from 'react'
import { chakra, Center, Image, Stack, Flex, Button, Spacer } from '@chakra-ui/react';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios'
const SearchTrackListItem = (props: any) => {
const {name, artists, album} = props.track;
const {userObj} = useContext(UserContext);


    return (<chakra.div>
        <hr></hr>
            <Flex>
        <Center>
            <Image
            aspect-ratio={1}
            m={2}
            w="120px"
            h="120px"
            float="left"
            src={album.images[1].url} alt='Album Cover'/>
        </Center>
        <Center>
<Stack ml={2}
mr='auto'>
        <span>{name}</span>
        <span>{artists.map((artist: any, i:number) => {
        if(i === artists.length - 1){
            return <span key={i}>{artist.name}</span>
        }
            return <span key={i} >{artist.name}, </span>
        })}</span>
        <span>{album.name}</span>
        <hr></hr>
        </Stack>
        </Center>
        <Spacer />
        <Button
        colorScheme="green"
        float="right"
        placeholder="send to friends">Send
        </Button>
        <Button onClick={() => {
            const params = {
                access_token: userObj.access_token,
                uri: props.track.uri
            }
            axios(`http://localhost:4000/addToQueue/${userObj.access_token}/${props.track.uri}`, {params}).then((data) => 
            console.log(data)).catch((err) => console.error(err));
        }}>
            Queue
        </Button>
        </Flex>
        </chakra.div>)
}

export default SearchTrackListItem