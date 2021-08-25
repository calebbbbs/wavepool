import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript, ThemeProvider } from '@chakra-ui/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { UserContextProvider } from './contexts/UserContext';
import theme from "./theme"
const client = new ApolloClient({
  uri: 'http://ec2-18-220-159-62.us-east-2.compute.amazonaws.com:8080/graphql',
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ApolloProvider client={client}>
      <UserContextProvider>
      <Router>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
      </Router>
      </UserContextProvider>
    </ApolloProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
