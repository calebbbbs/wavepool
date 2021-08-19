import React from 'react';
import ReactDOM from 'react-dom';
import {ChakraProvider} from '@chakra-ui/react'
import App from './App'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ChakraProvider>
  <ApolloProvider client={client}>
  <App/>
  </ApolloProvider>
  </ChakraProvider>,
  document.getElementById('root'),
);