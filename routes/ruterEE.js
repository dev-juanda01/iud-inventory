"use strict";

const express = require("express"),
  router = express.Router(),
  controllerEE = require(`../controllers/ctrlEstadoEquipo`);

router
  .get("/", controllerEE.obtenerEstadoEquipos)
  .post("/", controllerEE.ingresarEstadoEquipo);

module.exports = router;
