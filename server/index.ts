import "reflect-metadata";
import cors from 'cors';
// import session from "express-session";
// import passport from "passport";
// import { Strategy } from "passport-spotify";
// const SpotifyStrategy = Strategy;
const { ApolloServer, gql } = require('apollo-server-express');
// const CLIENT_PATH = __dirname + '/client/dist';
import express, {json} from 'express';
import path from 'path';
import { RequestHandler } from "express-serve-static-core";
const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://studio.apollographql.com'];

const options: cors.CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: 'Content-Type, Authorization',
};
app.options(allowedOrigins, cors() as RequestHandler);
app.use('', cors(options) as RequestHandler);
app.use(json);
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

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });
  app.get('*', (req, res) => {
    res.sendFile('client/dist/index.html', { root: path.join(__dirname, '../') });
});

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}
startApolloServer();