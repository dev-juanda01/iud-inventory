"use strict";

const express = require("express"),
  router = express.Router(),
  controllerTE = require(`../controllers/ctrlTipoEquipo`);

router
  .get("/", controllerTE.obtenerTipoEquipos)
  .get("/", controllerTE.obtenerTipoEquipo)
  .post("/", controllerTE.ingresarTipoEquipo)
  .put("/", controllerTE.actualizarTipoEquipo)
  .delete("/", controllerTE.eliminarTipoEquipo);

module.exports = router;
