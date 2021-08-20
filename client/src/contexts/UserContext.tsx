import * as React from "react";
import { useState } from "react";
import axios from "axios";
// import { response } from 'express';
// interface UserContextInterface {
//   defaultValue: any
// }

const UserContext = React.createContext(undefined as any);
// eslint-disable-next-line react/prop-types
const UserContextProvider: React.FC = ({ children }) => {
  const [userObj, setUserObj] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const getUser = () => {
    axios.get<any>("http://localhost:4000/getUser").then((res) => {
      if (res.data) {
        setUserObj(res.data);
        setIsLoggedIn(true);
      }
    });
  };

  React.useEffect(() => {
    getUser();
  }, [JSON.stringify(userObj)]);
  const userProps = {
    userObj,
    isLoggedIn,
    getUser,
  };

  return (
    <UserContext.Provider value={userProps}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };

