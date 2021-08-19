











// // import session from "express-session";
// // import passport from "passport";
// // import { Strategy } from "passport-spotify";
// // const SpotifyStrategy = Strategy;
// require('dotenv').config();
// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const SpotifyStrategy = require('passport-spotify').Strategy;

// const { CLIENT_ID, CLIENT_SECRET, SESSION_SECRET } = process.env;

// const port = 4001;
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
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: 'http://localhost:${port}',
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

// const app = express();
// // configure Express
// // app.set('views', __dirname + '/views');
// // app.set('view engine', 'html');

// app.use(
//   session({secret: 'keyboard cat', resave: true, saveUninitialized: true})
// );
// // Initialize Passport!  Also use passport.session() middleware, to support
// // persistent login sessions (recommended).
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(express.static(__dirname + '/public'));

// // app.engine('html', consolidate.nunjucks);

// app.get('/', function (req, res) {
//   res.render('index.html', {user: req.user});
// });

// app.get('/account', ensureAuthenticated, function (req, res) {
//   res.render('account.html', {user: req.user});
// });

// app.get('/login', function (req, res) {
//   res.render('login.html', {user: req.user});
// });

// // GET /auth/spotify
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request. The first step in spotify authentication will involve redirecting
// //   the user to spotify.com. After authorization, spotify will redirect the user
// //   back to this application at /auth/spotify/callback
// app.get(
//   '/auth/spotify',
//   passport.authenticate('spotify', {
//     scope: ['user-read-email', 'user-read-private'],
//     showDialog: true,
//   })
// );

// // GET /auth/spotify/callback
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request. If authentication fails, the user will be redirected back to the
// //   login page. Otherwise, the primary route function function will be called,
// //   which, in this example, will redirect the user to the home page.
// app.get(
//   authCallbackPath,
//   passport.authenticate('spotify', {failureRedirect: '/login'}),
//   function (req, res) {
//     res.redirect('/');
//   }
// );

// app.get('/logout', function (req, res) {
//   req.logout();
//   res.redirect('/');
// });

// app.listen(port, function () {
//   console.log('App is listening on port ' + port);
// });

// // Simple route middleware to ensure user is authenticated.
// //   Use this route middleware on any resource that needs to be protected.  If
// //   the request is authenticated (typically via a persistent login session),
// //   the request will proceed. Otherwise, the user will be redirected to the
// //   login page.
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }