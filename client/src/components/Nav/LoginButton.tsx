import React, {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext'
import { Button, Link } from '@chakra-ui/react';
const LoginButton = (props: any) => {

const {getUser} = useContext(UserContext);

  return (
    <Link
    float="right"
    href='auth/spotify'>
      <Button
      m={4}
      onClick={getUser}
      colorScheme='green'>Auth with Spotify</Button>
    </Link>
  );
};

export default LoginButton;


