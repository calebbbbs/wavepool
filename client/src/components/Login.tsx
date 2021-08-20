import React from 'react';
import { Button, Link } from '@chakra-ui/react';
const Login = () => {
  return (
    <Link href='auth/spotify'>
      <Button colorScheme='green'>Auth with Spotify</Button>
    </Link>
  );
};

export default Login;


