"use strict";

const { validationResult, check } = require("express-validator");
const { idExiste } = require("../helpers/validators");
const { validarCampos } = require("../middlewares/validar_campos");
const { validarJWT } = require("../middlewares/validar_jwt");
const { validarRolAdmin } = require("../middlewares/validar_rol_admin");
const express = require("express");

const router = express.Router();
const {
  ingresarMarcaEquipo,
  obtenerMarcaEquipo,
  obtenerMarcaEquipos,
  actualizarMarcaEquipo,
  eliminarMarcaEquipo,
} = require("../controllers/ctrlMarcaEquipo");

router
  .get("/", [validarJWT, validarRolAdmin], obtenerMarcaEquipos)
  .get("/", [validarJWT, validarRolAdmin], obtenerMarcaEquipo)
  .post(
    "/",
    [
      // validarJWT
      check("nombre", "Nombre obligatorio - Ingreselo").notEmpty(),
      check("estado", "El estado es invalido - No es booleano").isBoolean(),
      validarCampos,
      validarJWT,
      validarRolAdmin,
    ],
    ingresarMarcaEquipo
  )
  .put(
    "/:id",
    [
      check("id", "Id invalido - No es un id de mongo").isMongoId(),
      check("id").custom(idExiste),
      validarCampos,
      validarJWT,
      validarRolAdmin,
    ],
    actualizarMarcaEquipo
  )
  .delete(
    "/:id",
    [check("id").custom(idExiste), validarCampos, validarJWT, validarRolAdmin],
    eliminarMarcaEquipo
  );

module.exports = router;
