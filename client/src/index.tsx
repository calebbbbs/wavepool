import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { UserContextProvider } from './contexts/UserContext';
import theme from "./theme"
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});



ReactDOM.render(
  <ChakraProvider>
    <ApolloProvider client={client}>
      <UserContextProvider>
      <Router>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </Router>
      </UserContextProvider>
    </ApolloProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
