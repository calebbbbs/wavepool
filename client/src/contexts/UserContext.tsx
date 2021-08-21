import * as React from 'react';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
// import getUsersCurrentPlayback from '../graphQL/helper';

// import { response } from 'express';
// interface UserContextInterface {
//   defaultValue: any
// }

const UserContext = React.createContext(undefined as any);
// eslint-disable-next-line react/prop-types
const UserContextProvider: React.FC = ({ children }) => {
  const [userObj, setUserObj] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currPlayback, setCurrPlayback] = useState<any>();

  const getUser = () => {
    axios.get<any>('http://localhost:4000/getUser').then((res) => {
      if (res.data) {
        setUserObj(res.data);
        setIsLoggedIn(true);
      }
    });
  };

  const getUsersCurrentPlayback = (access_token: string) => {
    const getCurrentPlayback: any = {
      method: 'get',
      url: 'https://api.spotify.com/v1/me/player',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    };

    return axios(getCurrentPlayback)
      .then((response) => {
        console.log(response.data);
        setCurrPlayback(response.data);
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
  };

  return (
    <UserContext.Provider value={userProps}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
