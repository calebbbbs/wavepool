import "reflect-metadata";
import cors from 'cors';
require('dotenv').config();
// const session = require('express-session');
// const passport = require('passport');
// const SpotifyStrategy = require('passport-spotify').Strategy;
const { ApolloServer, gql } = require('apollo-server-express');
// const CLIENT_PATH = __dirname + '/client/dist';
import express, {json} from 'express';
import path from 'path';
import { RequestHandler } from "express-serve-static-core";

// const { CLIENT_ID, CLIENT_SECRET, SESSION_SECRET } = process.env;


// const authCallbackPath = '/auth/spotify/callback';

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//   done(null, obj);
// });

// passport.use(
//   new SpotifyStrategy(
//     {
//       clientID: CLIENT_ID,
//       clientSecret: CLIENT_SECRET,
//       callbackURL: `http://localhost:4000${authCallbackPath}`,
//       passReqToCallback: true
//     },
//     (accessToken, refreshToken, expires_in, profile, done) =>{

//       process.nextTick(() => {
//         // To keep the example simple, the user's spotify profile is returned to
//         // represent the logged-in user. In a typical application, you would want
//         // to associate the spotify account with a user record in your database,
//         // and return that user instead.
//         // done(null, profile);
//         done(null, Object.assign({}, profile, { accessToken, refreshToken, expires_in, profile, done}));
//       });
//     }
//   )
// );


const app = express();

// app.use(
//   session({secret: SESSION_SECRET, resave: true, saveUninitialized: true})
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(express.static(__dirname + '/public'));

// app.get(
//   '/auth/spotify',
//   passport.authenticate('spotify', {
//     scope: ['user-read-email', 'user-read-private'],
//     showDialog: true,
//   })
// );

// app.get(
//   authCallbackPath,
//   passport.authenticate('spotify', {failureRedirect: '/login'}),
//   function (req, res) {
//     res.redirect('/');
//   }
// );

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

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }