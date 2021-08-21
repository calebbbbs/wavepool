import * as React from 'react';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';

// import getUsersCurrentPlayback from '../graphQL/helper';

// import { response } from 'express';
// interface UserContextInterface {
//   defaultValue: any
// }

const UserContext = React.createContext(undefined as any);
// eslint-disable-next-line react/prop-types
const UserContextProvider: React.FC = ({ children }) => {

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:4000/auth/spotify/callback'
  });

  const [userObj, setUserObj] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currPlayback, setCurrPlayback] = useState<any>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const [spotifyApi, setSpotifyApi] = useState<SpotifyWebApi>()
  const getUser = () => {
    axios.get<any>('http://localhost:4000/getUser').then((res) => {
      if (res.data) {
        setUserObj(res.data);
        setIsLoggedIn(true);
        if(userObj){
        getUsersCurrentPlayback(userObj.access_token);
        console.log(`this is the fuckin api`, spotifyApi)
        spotifyApi.setAccessToken(userObj.access_token);
        }
      }
    });
  };

  const getUsersCurrentPlayback = async (access_token: string) => {
    const getCurrentPlayback: any = {
      method: 'get',
      url: 'https://api.spotify.com/v1/me/player',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    };

    await axios(getCurrentPlayback)
      .then((response) => {
        setCurrPlayback(response.data);
        console.log(response.data);
        setIsPlaying(response.data.is_playing)
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };


  React.useEffect(() => {
    getUser();
  }, [JSON.stringify(userObj)]);



  const userProps = {
    userObj,
    isLoggedIn,
    getUser,
    getUsersCurrentPlayback,
    currPlayback,
    setCurrPlayback,
    spotifyApi,
    isPlaying,
    setIsPlaying
  };

  return (
    <UserContext.Provider value={userProps}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
