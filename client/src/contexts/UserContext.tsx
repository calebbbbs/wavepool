import * as React from "react";
import { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";


const UserContext = React.createContext(undefined as any);
// eslint-disable-next-line react/prop-types
const UserContextProvider: React.FC = ({ children }) => {


  const [userObj, setUserObj] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currPlayback, setCurrPlayback] = useState<any>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [recentPlays, setRecentPlays] = useState<any>();
  const [userPlaylists, setUserPlaylists] = useState<any>();

  const getRecentlyPlayed = () => {
    const reqConfig: AxiosRequestConfig = {
      method: "get",
      url: `http://localhost:4000/spotify/getRecentlyPlayed/${userObj.user_id}`,
    };
    axios(reqConfig)
      .then(
        function (data: any) {
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
          getUsersCurrentPlayback();
        }
      }
    });
  };

  const getUsersCurrentPlayback = () => {

    return axios.get<any>(`http://localhost:4000/spotify/currPlayback/${userObj.user_id}`)
      .then((response) => {
        setCurrPlayback(response.data);
        setIsPlaying(response.data.is_playing);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };



  const getUsersPlaylists = (access_token: string) => {
//getUserPlaylists()
    //   .then((response) => {
    //     // const res: any[] = [];
    //     // response.body.items.forEach((item: any) => res.push(item));
    //     setUserPlaylists(response.body.items);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  React.useEffect(() => {
    getUser();
    if (userObj) {
      getRecentlyPlayed();
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
