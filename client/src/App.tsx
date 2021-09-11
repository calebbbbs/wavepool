import React, { ReactElement, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { UserContext } from './contexts/UserContext';
import Main from './components/Main/Main';
import Welcome from './components/Welcome/Welcome';

const App = (props: any): ReactElement => {
  const { userObj, isLoggedIn }: any = useContext(UserContext);

return (
    <Switch>
      <Route exact path='/'>
        {isLoggedIn && userObj ? <Main cusTheme={props.cusTheme} toggleFont={props.toggleFont} changeColorTheme={props.changeColorTheme}/> : <Welcome/>}
      </Route>
    </Switch>
);
}
export default App;
