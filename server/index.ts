import "reflect-metadata";
import cors from 'cors';
import { buildSchema } from "type-graphql";
import { createConnection } from 'typeorm';
import typeOrmConfig from '../server/db/dbConfig';
import path from 'path';

const { ApolloServer} = require('apollo-server-express');
const express = require('express');
const CLIENT_PATH = path.resolve(__dirname, '..', 'client/dist');
const allowedOrigins = ['http://localhost:4000/', 'https://studio.apollographql.com'];

import {UserResolver} from "./graphql/UserResolver";
// import  typeDefs  from "./graphql/typeDefs";

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

async function startApolloServer() {

  await createConnection(typeOrmConfig).catch(err => console.log(err));
  const schema = await buildSchema({
    resolvers: [UserResolver]
  }
  );
  const server = new ApolloServer({ schema });
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
