"use strict";

const { validationResult, check } = require("express-validator");
const { idExiste } = require("../helpers/validators");
const { validarCampos } = require("../middlewares/validar_campos");
const { validarJWT } = require("../middlewares/validar_jwt");
const { validarRolAdmin } = require("../middlewares/validar_rol_admin");
const express = require("express");

const router = express.Router();
const {
  ingresarTipoEquipo,
  obtenerTipoEquipos,
  obtenerTipoEquipo,
  eliminarTipoEquipo,
  actualizarTipoEquipo,
} = require("../controllers/ctrlTipoEquipo");

router
  .get("/", [validarJWT, validarRolAdmin], obtenerTipoEquipos)
  .get("/", [validarJWT, validarRolAdmin], obtenerTipoEquipo)
  .post(
    "/",
    [
      // validarJWT
      check("nombre", "Nombre obligatorio - Ingreselo").isIn([
        "COMPUTO",
        "MOVILES",
      ]),
      check("estado", "El estado es invalido - No es booleano").isBoolean(),
      validarCampos,
      validarJWT,
      validarRolAdmin,
    ],
    ingresarTipoEquipo
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
    actualizarTipoEquipo
  )
  .delete(
    "/:id",
    [check("id").custom(idExiste), validarCampos, validarJWT, validarRolAdmin],

    eliminarTipoEquipo
  );

module.exports = router;
