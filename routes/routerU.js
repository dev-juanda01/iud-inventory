"use strict";

const { validationResult, check } = require('express-validator');
const express = require("express"),
  router = express.Router(),
  controllerU = require("../controllers/ctrlUsurarios");
  

router
  .get("/", controllerU.obtenerUsuarios)
  .get("/", controllerU.obtenerUsuario)
  .post("/", [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('contrasena', 'invalid.contrasena').not().isEmpty(),
    check('rol', 'invalid.rol').isIn( ['ADMIN', 'DOCENTE'] ),
    check('estado', 'invalid.nombre').isBoolean()], controllerU.ingresarUsuarios)

  .put("/", controllerU.actualizarUsuario)
  .delete("/", controllerU.eliminarUsuario);

module.exports = router;
