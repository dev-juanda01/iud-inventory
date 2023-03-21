"use strict";

const express = require("express"),
  router = express.Router(),
  controllerI = require(`../controllers/ctrlInventario`);

router
  .get("/", controllerI.obtenerInventarios)
  .get("/", controllerI.obtenerInventario)
  .post("/", controllerI.ingresarInventario)
  .put("/", controllerI.actualizarInventario)
  .delete("/", controllerI.eliminarInventario);

module.exports = router;
