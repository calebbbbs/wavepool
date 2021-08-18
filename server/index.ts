import "reflect-metadata";
import cors from 'cors';
require('dotenv').config();

const session = require('express-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
import path from 'path';


const CLIENT_PATH = path.resolve(__dirname, '..', 'client/dist');
const allowedOrigins = ['http://localhost:4000', 'https://studio.apollographql.com'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: 'Content-Type, Authorization',
};

const { CLIENT_ID, CLIENT_SECRET, SESSION_SECRET } = process.env;
const authCallbackPath = '/auth/spotify/callback';

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

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  })

  passport.use(
    new SpotifyStrategy(
      {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: `http://localhost:4000${authCallbackPath}`,
        passReqToCallback: true
      },
      (accessToken, refreshToken, expires_in, profile, done) =>{

        process.nextTick(() => {
          // To keep the example simple, the user's spotify profile is returned to
          // represent the logged-in user. In a typical application, you would want
          // to associate the spotify account with a user record in your database,
          // and return that user instead.
          // done(null, profile);
          done(null, Object.assign({}, profile, { accessToken, refreshToken, expires_in, profile, done}));
        });
      }
    )
  );

  app.use(
    session({secret: SESSION_SECRET, resave: true, saveUninitialized: true})
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', function (req, res) {
    res.render('index.html', {user: req.user});
  });

  app.get('/account', ensureAuthenticated, function (req, res) {
    res.render('account.html', {user: req.user});
  });

  app.get('/login', function (req, res) {
    res.render('login.html', {user: req.user});
  });


  app.get(
    '/auth/spotify',
    passport.authenticate('spotify', {
      scope: ['user-read-email', 'user-read-private'],
      showDialog: true,
    })
  );

  app.get(
    authCallbackPath,
    passport.authenticate('spotify', {failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  );


  app.options('*', cors());
app.use('*', cors(options));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(CLIENT_PATH));


  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
}
startApolloServer();

