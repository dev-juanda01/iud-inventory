"use strict";

const express = require("express"),
  router = express.Router(),
  controllerI = require(`../controllers/ctrlInventario`);

router
  .get("/", controllerI.obtenerInventarios)
  .get("/", controllerI.obtenerInventario)
  .post("/", controllerI.ingresarInventario);
