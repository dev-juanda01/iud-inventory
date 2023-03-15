"use strict";

const express = require("express"),
  router = express.Router(),
  controllerTE = require(`../controllers/ctrlTipoEquipo`);

router
  .get("/", (req, res, next) => {
    res.render("home");
  })
  .get("/api/tipoEquipo/:idTE", controllerTE.obtenerTipoEquipo);

module.exports = router;
