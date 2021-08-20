import React, {useContext} from 'react';
import Login from './Login';
import { UserContext } from '../contexts/UserContext';
function Main(props: any) {
const {isLoggedIn}: any = useContext(UserContext);
    return (<div>
       {!isLoggedIn ? <Login/> :
        JSON.stringify(props.user)} - user data</div>)};

export default Main;