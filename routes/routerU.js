"use strict";

const { validationResult, check } = require("express-validator");
const { correoExiste } = require("../helpers/validators");
const { validarCampos } = require("../middlewares/validar_campos");
const express = require("express");
const router = express.Router();
const {
  ingresarUsuarios,
  obtenerUsuario,
  obtenerUsuarios,
  eliminarUsuario,
  actualizarUsuario,
} = require("../controllers/ctrlUsuarios");

router
  .get("/", obtenerUsuarios)
  .get("/", obtenerUsuario)
  .post(
    "/",
    [
      check("nombre", "Nombre obligatorio - Ingreselo").notEmpty(),
      check("email", "Correo no valido - No es un correo").isEmail(),
      check("email").custom(correoExiste),
      check("contrasena", "Contraseña no valida - Ingresela").not().isEmpty(),
      check("rol", "Rol no valido - No es admitido").isIn(["ADMIN", "DOCENTE"]),
      check("estado", "El estado es invalido - No es booleano").isBoolean(),
      validarCampos,
    ],
    ingresarUsuarios
  )

  // TODO: Validar datos de la actualización y eliminación
  
  .put("/:id", [check("id")], actualizarUsuario)
  
  .delete("/", eliminarUsuario);

module.exports = router;
