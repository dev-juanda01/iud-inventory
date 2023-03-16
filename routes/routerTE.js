"use strict";

const express = require("express"),
  router = express.Router(),
  controllerTE = require(`../controllers/ctrlTipoEquipo`);

router
  .get("/", controllerTE.obtenerTipoEquipo)
  // .get("/", controllerTE.obtenerTipoEquipos)
  .post("/", controllerTE.ingresarTipoEquipo);

module.exports = router;
