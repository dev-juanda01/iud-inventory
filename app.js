"use strict";

const express = require("express"),
  pug = require("pug"),
  morgan = require("morgan"),
  favicon = require("serve-favicon"),
  faviconURL = `${__dirname}/public/img/logo-iud.png`,
  publicDir = express.static(`${__dirname}/public`),
  viewDir = `${__dirname}/views`,
  routes = require("./routes/index"),
  port = process.env.PORT || 3000,
  app = express();

app.set("views", viewDir).set("view engine", "pug").set("port", port);
app.use(favicon(faviconURL)).use(morgan("dev")).use(publicDir).use(routes);

module.exports = app;
