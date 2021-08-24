import React, { ReactElement, useContext } from 'react';
import Nav from './components/Nav/Nav';
import { Switch, Route } from 'react-router-dom';

import { UserContext } from './contexts/UserContext';
import Main from './components/Main/Main';
import Welcome from './components/Welcome/Welcome';

const App = (): ReactElement => {
  const { userObj, isLoggedIn }: any = useContext(UserContext);

return (
    <Switch>
      <Route exact path='/'>
        <Nav user={...userObj}/>
        {isLoggedIn && userObj ? <Main/> : <Welcome/>}
      </Route>
    </Switch>
);
}
export default App;
