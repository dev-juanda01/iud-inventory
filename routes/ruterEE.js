"use strict";

const { validationResult, check } = require("express-validator");
const { correoExiste, idExiste } = require("../helpers/validators");
const { validarCampos } = require("../middlewares/validar_campos");
const { validarJWT } = require("../middlewares/validar_jwt");
const { validarRolAdmin } = require("../middlewares/validar_rol_admin");
const express = require("express");

const router = express.Router();
const {
  obtenerEstadoEquipos,
  obtenerEstadoEquipo,
  ingresarEstadoEquipo,
  actualizarEstadoEquipo,
  eliminarEstadoEquipo
  
} = require("../controllers/ctrlEstadoEquipo");

router
  .get("/", [validarJWT, validarRolAdmin], obtenerEstadoEquipos)
  .get("/", [validarJWT, validarRolAdmin], obtenerEstadoEquipo)
  .post("/",
  [
    check("nombre", "Nombre no valido - No es admitido").isIn(["EN USO", "EN BODEGA", "DEPRECIADO"]), 
    check("estado", "El estado es invalido - No es booleano").isBoolean(),
    validarCampos,
    validarJWT,
    validarRolAdmin
  ], 
  ingresarEstadoEquipo)
  .put("/:id",
  [
    check("id", "Id invalido - No es un id de mongo").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
    validarJWT,
    validarRolAdmin
  ], 
  actualizarEstadoEquipo)
  .delete("/:id",
  [
    check("id", "Id invalido - No es un id de mongo").isMongoId(),
    check("id").custom(idExiste), 
    validarCampos,
    validarJWT,
    validarRolAdmin
  ],
   eliminarEstadoEquipo);

module.exports = router;
