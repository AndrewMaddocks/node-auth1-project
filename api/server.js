const express = require("express");
const sessions = require("express-session");
const KnexSessionStore = require("connect-session-knex")(sessions); //make sure to put after and to store sessions in the database

const authRouter = require("../auth/authRouter");
const usersRouter = require("../users/usersRouter");
const knex = require("../data/dbConfig");

const server = express();

const sessionConfig = {
  // session storage options
  name: "jello", // default would be sid
  secret: "keep it secert, keep it safe!", // used for encryption (must be an enviroment variable)
  saveUninitialized: true, // has implications about  GDPR laws
  resave: false,

  // how to store the sessions
  store: new KnexSessionStore({
    // do not forget the new keyword!!!!
    knex, // imported from dcConfig.js

    createtable: true,

    //optional
    clearInterval: 1000 * 60 * 10, // defaults to 6000
    sidfieldname: "sid",
    tablename: "sessions"
  }),

  // cookie options
  cookie: {
    maxAge: 1000 * 60 * 10, //session will be good for 10 min in milliseconds
    secure: false, //if false the cookie is sent over http, if true only sent over https
    httpOnly: true //if true Js cannot access the cookie
  }
};
server.use(express.json());
server.use(sessions(sessionConfig)); // add a req.session object

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

module.exports = server;
