import * as React from "react";
import { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import SpotifyWebApi from "spotify-web-api-node";

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
    redirectUri: "http://localhost:4000/auth/spotify/callback",
  });

  const [userObj, setUserObj] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currPlayback, setCurrPlayback] = useState<any>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [recentPlays, setRecentPlays] = useState<any>();
  const [userPlaylists, setUserPlaylists] = useState<any>();

  const getRecentlyPlayed = (access_token: string) => {
    const reqConfig: AxiosRequestConfig = {
      method: "get",
      url: `http://localhost:4000/spotify/getRecentlyPlayed/${userObj.user_id}`,
    };
    axios(reqConfig)
      .then(
        function (data: any) {
          console.log(data);
          const res: any[] = [];
          data.data.body.items.forEach((item: any) => {
            return res.push(item.track)});
          setRecentPlays(res);
          return;
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  };

  const getUser = () => {
    axios.get<any>("http://localhost:4000/getUser").then((res) => {
      if (res.data) {
        setUserObj(res.data);
        setIsLoggedIn(true);
        if (userObj) {
          getUsersCurrentPlayback(userObj.user_id);
        }
      }
    });
  };

  const getUsersCurrentPlayback = (user_id: String) => {
    console.log(`get users current playback ran`);
    return axios.get<any>(`http://localhost:4000/spotify/currPlayback/${user_id}`)
      .then((response) => {
        console.log(response);
        setCurrPlayback(response.data);
        setIsPlaying(response.data.is_playing);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  getUsersCurrentPlayback("invadead");

  const getUsersPlaylists = (access_token: string) => {
    spotifyApi.setAccessToken(access_token);
    spotifyApi
      .getUserPlaylists()
      .then((response) => {
        // const res: any[] = [];
        // response.body.items.forEach((item: any) => res.push(item));
        setUserPlaylists(response.body.items);
        console.log(response.body.items);
        // return res;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getUser();
    if (userObj) {
      getRecentlyPlayed(userObj.access_token);
      getUsersPlaylists(userObj.access_token);
    }
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
    setIsPlaying,
    recentPlays,
    setRecentPlays,
    getRecentlyPlayed,
    getUsersPlaylists,
    userPlaylists,
    setUserPlaylists,
  };

  return (
    <UserContext.Provider value={userProps}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
