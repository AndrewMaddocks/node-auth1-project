const express = require("express");

const authRouter = require("../auth/authRouter");
const usersRouter = require("../users/usersRouter");

const server = express();

server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

module.exports = server;
