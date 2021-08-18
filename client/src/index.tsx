import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'

import {
  ApolloClient,
  InMemoryCache,
  // ApolloProvider,
  // useQuery,
  gql,
  ApolloProvider
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query Query {
        hello
      }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
  <App/>
  </ApolloProvider>,
  document.getElementById('root'),
);