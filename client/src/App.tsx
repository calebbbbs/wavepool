import React, { ReactElement, useContext } from 'react';
import Test from './components/Test';
import Login from './components/Login';
import { Switch, Route } from 'react-router-dom';

import { UserContext } from './contexts/UserContext';

const App = (): ReactElement => {
  const { userObj }: any = useContext(UserContext);
  console.log(userObj);
return (
  <>
    <h1>Wavepool</h1>
    <Test {...userObj}></Test>
    <Switch>
      <Route exact path='/'></Route>
      <Route path='/userLogin'>
        <Login></Login>
      </Route>
    </Switch>
  </>
);
}
export default App;
