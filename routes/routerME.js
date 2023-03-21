"use strict";

const express = require("express"),
  router = express.Router(),
  controllerME = require(`../controllers/ctrlMarcaEquipo`);

router
  .get("/", controllerME.obtenerMarcaEquipos)
  .get("/", controllerME.obtenerMarcaEquipo)
  .post("/", controllerME.ingresarMarcaEquipo)
  .put("/", controllerME.actualizarMarcaEquipo)
  .delete("/", controllerME.eliminarMarcaEquipo);

module.exports = router;
