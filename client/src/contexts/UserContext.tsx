
import * as React from 'react';
import { useState } from 'react';

import axios from 'axios';
// import { response } from 'express';

// interface UserContextInterface {
//   defaultValue: any
// }

const UserContext = React.createContext(undefined as any);

// eslint-disable-next-line react/prop-types
const UserContextProvider: React.FC = ({ children }) =>{
  const [userObj, setUserObj] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUser = () => {
    axios.get<any>('/getUser').then(res => {
      console.log('!!!!!!!! RES line 20', res);
      if(res){
        console.log('!!!!!!', res);
        setUserObj(res);
        setIsLoggedIn(true);
      }
    }
    );
  };
  const userProps = {
    userObj,
    isLoggedIn,
    getUser,
  };

  return (
    <UserContext.Provider value={userProps}>
      {children}
    </UserContext.Provider>
  );
}


export { UserContext, UserContextProvider };