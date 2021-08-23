import "reflect-metadata";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import path from "path";
import typeOrmConfig from "../server/db/dbConfig";
import User from "./db/entities/User";

import addToQueue from '../server/helpers/SpotifyWebApi';


import axios, { AxiosError } from "axios";

require("dotenv").config();

// import User from "./db/entities/user";
const session = require("express-session");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
// import * as express from 'express';
import { Request, Response } from "express-serve-static-core";
import { Profile, VerifyCallback } from "passport-spotify";

const CLIENT_PATH = path.resolve(__dirname, "..", "client/dist");
const allowedOrigins = [
  "http://localhost:4000/",
  "https://studio.apollographql.com",
  "https://api.spotify.com/",
];

import { UserResolver, FriendResolver, RecommendedResolver } from "./graphql/resolvers";

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

async function startApolloServer() {
  await createConnection(typeOrmConfig).catch((err) => console.log(err));
  const schema = await buildSchema({
    resolvers: [ UserResolver, FriendResolver, RecommendedResolver ]
  }
  );
const server = new ApolloServer({ schema });
const { CLIENT_ID, CLIENT_SECRET, SESSION_SECRET } = process.env;
const authCallbackPath = '/auth/spotify/callback';

  await server.start();

  const app = express();
  app.use(cors());

  passport.serializeUser(function (user: object, done: VerifyCallback) {
    done(null, user);
  });

  passport.deserializeUser(function (obj: object, done: VerifyCallback) {
    done(null, obj);
  });

  passport.use(
    new SpotifyStrategy(
      {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: `http://localhost:4000${authCallbackPath}`,
        passReqToCallback: true,
      },
      async (
        req: any,
        accessToken: any,
        refreshToken: string,
        expires_in: number,
        profile: Profile,
        done: VerifyCallback
      ) => {
        const user = new User();
        user.user_id = profile.id;
        user.user_name = profile.displayName;
        user.user_email = profile._json.email;
        user.access_token = accessToken;
        user.refresh_token = refreshToken;
        //user.photo = profile.photos[0].value || null;
        await user.save();
        process.nextTick(() => {
          done(null, user);
        });
      }
    )
  );

  // const addToQueue = async (access_token: String, uri: String) => {
  //   const toQueue: any = {
  //     method: "POST",
  //     url: `https://api.spotify.com/v1/me/player/queue?uri=${uri}`,
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   };
  //   await axios(toQueue)
  //     .then((response) => {
  //       // console.log(JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  app.get("/addToQueue/:access_token/:uri", (req: Request, res: Response) => {
    const { access_token, uri } = req.params;
    addToQueue(access_token, uri)
      .then((data) => res.status(201).send(data))
      .catch((error: AxiosError) => console.log(error));
  });

  app.use(
    session({ secret: SESSION_SECRET, resave: true, saveUninitialized: true })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get(
    "/auth/spotify",
    await passport.authenticate("spotify", {
      scope: [
        "user-read-email",
        "user-read-private",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "playlist-modify-public",
        "user-read-recently-played",
      ],
      showDialog: true,
    }),
    (req: Request, res: Response) => {
      res.status(200).send(req.user);
    }
  );

  app.get(
    authCallbackPath,
    await passport.authenticate("spotify", { failureRedirect: "/login" }),
    (req: Request, res: Response) => {
      res.redirect("/");
    }
  );

  app.get("/getUser", (req: Request, res: Response) => {
    res.send(req.user);
  });

  app.options("*", cors());
  app.use("*", cors(options));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(CLIENT_PATH));

  server.applyMiddleware({ app });

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🌊 Ride the Wave 🌊 \n
  http://localhost:4000${server.graphqlPath}\n
  http://localhost:4000\n`);
  return { server, app };
}
startApolloServer();
