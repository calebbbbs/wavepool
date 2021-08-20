import React, { ReactElement, useContext } from 'react';
import Main from './components/Main/Main';
import {chakra} from '@chakra-ui/react'
import { Switch, Route } from 'react-router-dom';

import { UserContext } from './contexts/UserContext';

const App = (): ReactElement => {
  const { userObj }: any = useContext(UserContext);
  console.log(userObj);
return (
  <>
    <chakra.h1
    fontSize="4xl"
    >Wavepool</chakra.h1>
    <Switch>
      <Route exact path='/'>
        <Main user={...userObj}/>
      </Route>
    </Switch>
  </>
);
}
export default App;
