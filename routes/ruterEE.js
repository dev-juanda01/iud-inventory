"use strict";

const express = require("express"),
  router = express.Router(),
  controllerEE = require(`../controllers/ctrlEstadoEquipo`);

router
  .get("/", controllerEE.obtenerEstadoEquipos)
  .get("/", controllerEE.obtenerEstadoEquipo)
  .post("/", controllerEE.ingresarEstadoEquipo)
  .put("/", controllerEE.actualizarEstadoEquipo)
  .delete("/", controllerEE.eliminarEstadoEquipo);

module.exports = router;
