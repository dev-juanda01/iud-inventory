"use strict";

const express = require("express"),
  pug = require("pug"),
  morgan = require("morgan"),
  favicon = require("serve-favicon"),
  bodyParser = require("body-parser"),
  dotenv = require("dotenv").config(),
  cors = require("cors"),
  faviconURL = `${__dirname}/public/img/logo-iud.png`,
  publicDir = express.static(`${__dirname}/public`),
  viewDir = `${__dirname}/views`,
  routesTE = require("./routes/routerTE"),
  routesView = require("./routes/routerView"),
  routesEE = require("./routes/ruterEE"),
  routesU = require("./routes/routerU"),
  routesI = require("./routes/routerI"),
  routesME = require("./routes/routerME"),
  routeAuth = require("./routes/auth"),
  port = process.env.PORT || 5000,
  app = express();

app.set("views", viewDir).set("view engine", "pug").set("port", port);
app
  .use(favicon(faviconURL))
  .use(morgan("dev"))
  .use(publicDir)
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(
    cors({
      origin: "*",
    })
  )
  .use("/", routesView)
  .use("/api/auth", routeAuth)
  .use("/api/tipoequipos", routesTE)
  .use("/api/estadoequipos", routesEE)
  .use("/api/usuarios", routesU)
  .use("/api/inventarios", routesI)
  .use("/api/marcaequipos", routesME);

module.exports = app;
