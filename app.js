"use strict";

const express = require("express"),
  pug = require("pug"),
  morgan = require("morgan"),
  favicon = require("serve-favicon"),
  bodyParser = require("body-parser"),
  dotenv = require("dotenv").config(),
  faviconURL = `${__dirname}/public/img/logo-iud.png`,
  publicDir = express.static(`${__dirname}/public`),
  viewDir = `${__dirname}/views`,
  routes = require("./routes/routerTE"),
  port = process.env.PORT || 5000,
  app = express();

app.set("views", viewDir).set("view engine", "pug").set("port", port);
app
  .use(favicon(faviconURL))
  .use(morgan("dev"))
  .use(publicDir)
  .use("/api/tipoequipos", routes)
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json());

module.exports = app;
