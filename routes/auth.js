const { check } = require("express-validator");
const { ctrlAuth } = require("../controllers/ctrlAuth");
const { validarCampos } = require("../middlewares/validar_campos");
const express = require("express");
const router = express.Router();

router.post(
  "/",
  [
    check("email", "Correo no valido - No es un correo").isEmail(),
    check("contrasena", "Contraseña no valida - Ingresela").notEmpty(),
    validarCampos,
  ],
  ctrlAuth
);

module.exports = router;
