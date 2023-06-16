"use strict";

const { validationResult, check } = require("express-validator");
const { inventarioExiste} = require("../helpers/validators");
const { validarCampos } = require("../middlewares/validar_campos");
const { validarJWT } = require("../middlewares/validar_jwt");
const { validarRolAdmin } = require("../middlewares/validar_rol_admin");
const express = require("express");

const router = express.Router();
const {
  ingresarInventario,
  obtenerInventario,
  obtenerInventarios,
  eliminarInventario,
  actualizarInventario,
} = require("../controllers/CtrlInventario");

router
  .get("/", [validarJWT, validarRolAdmin], obtenerInventarios)
  .get("/", [validarJWT, validarRolAdmin], obtenerInventario)
  .post("/", 
  [
    check("serial", "El serial es invalido - No es permitido").notEmpty(),
    check("modelo", "El modelo es invalido - No es permitido").notEmpty(),
    check("descripcion", "La descripcion es invalida - No es permitida").notEmpty(),
    check("foto", "La foto es invalida - No es permitida").notEmpty(),
    check("color", "El color es invalido - No es permitido").notEmpty(),
    check("fechaCompra", "La fecha de compra es invalida - No es permitida").isDate(),
    check("precio", "El precio es invalido - No es permitido").isNumeric(),

    validarCampos,
    validarJWT,
    validarRolAdmin
  ], 
  ingresarInventario)
  .put("/:id",
  [
    check("id", "Id invalido - No es un id de mongo").isMongoId(),
    check("id").custom(inventarioExiste),
    validarCampos,
    validarJWT,
    validarRolAdmin
  ], actualizarInventario)
  .delete("/:id",
  [
    check("id", "Id invalido - No es un id de mongo").isMongoId(),
    check("id").custom(inventarioExiste), 
    validarCampos,
    validarJWT,
    validarRolAdmin
  ], eliminarInventario);

module.exports = router;
