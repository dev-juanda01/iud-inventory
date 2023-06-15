"use strict";

const { validationResult, check } = require("express-validator");
const { correoExiste, idExiste } = require("../helpers/validators");
const { validarCampos } = require("../middlewares/validar_campos");
const { validarJWT } = require("../middlewares/validar_jwt");
const { validarRolAdmin } = require("../middlewares/validar_rol_admin");
const express = require("express");

const router = express.Router();
const {
  ingresarUsuarios,
  obtenerUsuario,
  obtenerUsuarios,
  eliminarUsuario,
  actualizarUsuario,
} = require("../controllers/ctrlUsuario");

router
  .get("/", [validarJWT], obtenerUsuarios)
  .get("/", obtenerUsuario)
  .post(
    "/",
    [
      // validarJWT
      check("nombre", "Nombre obligatorio - Ingreselo").notEmpty(),
      check("email", "Correo no valido - No es un correo").isEmail(),
      check("email").custom(correoExiste),
      check("contrasena", "Contraseña no valida - Ingresela").not().isEmpty(),
      check("rol", "Rol no valido - No es admitido").isIn(["ADMIN", "DOCENTE"]),
      check("estado", "El estado es invalido - No es booleano").isBoolean(),
      validarCampos,
      validarJWT,
      validarRolAdmin
    ],
    ingresarUsuarios
  )
  // TODO: Validar datos de la actualización y eliminación
  .put(
    "/:id",
    [
      check("id", "Id invalido - No es un id de mongo").isMongoId(),
      check("id").custom(idExiste),
      validarCampos,
    ],
    actualizarUsuario
  )
  .delete("/", [check("id").custom(idExiste), validarCampos], eliminarUsuario);

module.exports = router;
