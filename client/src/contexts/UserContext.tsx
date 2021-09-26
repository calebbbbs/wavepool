import * as React from "react";
import { useState } from "react";
// import {refreshToken} from '../../../server/spotify/helpers'
import { useLazyQuery } from "@apollo/client";
import axios, { AxiosError } from "axios";
import GET_USER_DATA from "../graphql_client/queries/GET_USER_DATA";
const UserContext = React.createContext(undefined as any);

// eslint-disable-next-line react/prop-types
const UserContextProvider: React.FC = ({ children }) => {
  const [userObj, setUserObj] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currPlayback, setCurrPlayback] = useState<any>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [recentPlays, setRecentPlays] = useState<any>();
  const [userPlaylists, setUserPlaylists] = useState<any>();
  const [getUserData, { error, data, refetch }] = useLazyQuery(GET_USER_DATA);
  const [selectedFriend, setSelectedFriend] = useState<any[]>([]);

  if (error) console.warn(error);
  const getRecentlyPlayed = () => {
    axios.get(`/spotify/getRecentlyPlayed/${userObj.user_id}`).then(
      function ({data}) {
        const res: any[] = [];
        data.body.items.forEach((item: any) => {
          return res.push(item.track);
        });
        return setRecentPlays(res);
      },
      function (error: AxiosError) {
        console.log('Error from get/spotify/getRecentlyPlayed', error.response?.data);
      }
    );
  };

  const getUser = () => {
    return axios.get<any>("/getUser").then(({data}) => {
      if (data) {
        if (Object.keys(data).length === 0) {
          return;
        }
        getUserData({
          variables: { getUserUserId: data.user_id },
        });
        setIsLoggedIn(true);
        if (userObj) {
          getUsersCurrentPlayback();
        }
        return;
      }
    });
  };

  const getUsersCurrentPlayback = () => {
    return axios
      .get<any>(`/spotify/currPlayback/${userObj.user_id}`)
      .then(({data}) => {
        setCurrPlayback(data);
        setIsPlaying(data.is_playing);
      })
      .catch((error: AxiosError) => {
        console.log('Error from getUsersCurrentPlayback UserContext', error.response?.data);
      });
  };

  const getUserPlaylists = () => {
    axios
      .get(`/spotify/userPlaylists/${userObj.user_id}`)
      .then(({data}) => {
        return setUserPlaylists(data);
      })
      .catch((error: AxiosError) => {
        console.log('Error from getUserPlaylists UserContext', error.response?.data);
      });
  };

  React.useEffect(() => {
    getUser();

    if (userObj) {
      // console.log(userObj.logged_in);
      getRecentlyPlayed();
      getUserPlaylists();
    }
  }, [JSON.stringify(userObj)]);

  React.useEffect(() => {
    if (data) {
      // console.log(data);
      const newUserObj = { ...data.getUser };
      newUserObj.recommendedTracks = data.getUser.recommendedTracks.filter(
        (e: any) => {
          return e.in_queue === true;
        }
      );
      setUserObj(newUserObj);
    }
  }, [data]);

  React.useEffect(() => {
    if (data) {
      console.log(data);
      const newUserObj = { ...data.getUser };
      newUserObj.notifications = data.getUser.notifications.filter(
        (e: any) => {
          return e.viewed === false;
        }
      );
      setUserObj(newUserObj);
    }
  }, [data]);

  const userProps = {
    userObj,
    isLoggedIn,
    getUser,
    getUsersCurrentPlayback,
    refetch,
    currPlayback,
    setCurrPlayback,
    isPlaying,
    setIsPlaying,
    recentPlays,
    setRecentPlays,
    getRecentlyPlayed,
    userPlaylists,
    setUserPlaylists,
    getUserPlaylists,
    selectedFriend,
    setSelectedFriend,
  };

  return (
    <UserContext.Provider value={userProps}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
