import "reflect-metadata";
import cors from 'cors';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./graphql/resolvers/HelloWorldResolver";
// const CLIENT_PATH = __dirname + '/client/dist';
import express from 'express';
import { RequestHandler } from "express-serve-static-core";
const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://studio.apollographql.com'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.options('*', cors() as RequestHandler);
app.use('', cors(options) as RequestHandler);
// app.use(json);


(async (app) => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(3001, () => {
    console.log("graphql server started");
  });
})(app);