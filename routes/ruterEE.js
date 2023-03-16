"use strict";

const express = require("express"),
  router = express.Router(),
  controllerEE = require(`../controllers/ctrlEstadoEquipo`);

router.get("/", controllerEE.obtenerEstadoEquipo);

module.exports = router;
