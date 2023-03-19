"use strict";

const express = require("express"),
  router = express.Router(),
  controllerEE = require(`../controllers/ctrlEstadoEquipo`);

router
  .get("/", controllerEE.obtenerEstadoEquipos)
  .get("/", controllerEE.obtenerEstadoEquipo)
  .post("/", controllerEE.ingresarEstadoEquipo);

module.exports = router;
