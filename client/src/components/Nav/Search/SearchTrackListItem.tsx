import React, {useContext} from 'react'
import { chakra, Center, Text, Image, Stack, Button, Spacer, useColorModeValue } from '@chakra-ui/react';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios'
const SearchTrackListItem = (props: any) => {
const {name, artists, album} = props.track;
const {userObj, getUsersPlaylists, spotifyApi} = useContext(UserContext);
const bg = useColorModeValue("gray.200", "gray.900")

    return (<chakra.div
    bg={bg}
    h="auto"
    borderRadius="2vh"
    m={2}>
        <hr></hr>
            <Stack
            mx={5}
            p={4}>
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
        <Text fontSize="md">{name}</Text>
        <Text fontSize="md">{artists.map((artist: any, i:number) => {
        if(i === artists.length - 1){
            return <Text key={i} fontSize="md">{artist.name}</Text>
        }
            return <Text key={i} fontSize="md" >{artist.name}, </Text>
        })}</Text>
        <Text fontSize="md">{album.name}</Text>
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
        <Button onClick={() => {
            spotifyApi.setAccessToken(userObj.access_token);
            getUsersPlaylists(userObj.access_token);

        }}
        colorScheme="teal"
        float="right"
        placeholder="add to playlist">Add
        </Button>
        </Stack>
        </chakra.div>)
}

export default SearchTrackListItem