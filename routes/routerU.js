"use strict";

const express = require("express"),
  router = express.Router(),
  controllerU = require("../controllers/ctrlUsurarios");

router
  .get("/", controllerU.obtenerUsuarios)
  .get("/", controllerU.obtenerUsuario)
  .post("/", controllerU.ingresarUsuarios);

module.exports = router;
