"use strict";

const express = require("express"),
  router = express.Router(),
  controllerTE = require(`../controllers/ctrlTipoEquipo`);

router
  // .get("/api/tipoequipos", controllerTE.obtenerTipoEquipo)
  .get("/", controllerTE.obtenerTipoEquipos);

module.exports = router;
