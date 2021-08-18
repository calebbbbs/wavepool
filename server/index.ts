import "reflect-metadata";
import cors from 'cors';
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
import { createConnection } from 'typeorm';
import typeOrmConfig from '../server/db/dbConfig';
import path from 'path';
const CLIENT_PATH = path.resolve(__dirname, '..', 'client/dist');
const allowedOrigins = ['http://localhost:4000', 'https://studio.apollographql.com'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: 'Content-Type, Authorization',
};


async function startApolloServer() {

  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };

  await createConnection(typeOrmConfig).catch(err => console.log(err));
  


  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();


  app.options('*', cors());
app.use('*', cors(options));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(CLIENT_PATH));


  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}
startApolloServer();
