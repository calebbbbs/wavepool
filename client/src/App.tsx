import React, { ReactElement, useContext } from 'react';
import Nav from './components/Nav/Nav';
import { Switch, Route } from 'react-router-dom';

import { UserContext } from './contexts/UserContext';

const App = (): ReactElement => {
  const { userObj }: any = useContext(UserContext);

return (
    <Switch>
      <Route exact path='/'>
        <Nav user={...userObj}/>
      </Route>
    </Switch>
);
}
export default App;
