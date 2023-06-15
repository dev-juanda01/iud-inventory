const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuarios");
const { generarJWT } = require("../helpers/generar_jwt");

const ctrlAuth = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).send({
        msg: "Usuario - No existe",
      });
    }

    if (!usuario.estado) {
      return res.status(400).send({
        msg: "Usuario - Estado inactivo",
      });
    }

    const validarContrasena = bcryptjs.compareSync(
      contrasena,
      usuario.contrasena
    );

    if (!validarContrasena) {
      return res.status(400).send({
        msg: `Usuario - Contraseña incorrecta`,
      });
    }

    // TODO: generar JWT - TOKEN
    // ......

    const token = generarJWT(usuario);

    return res.status(200).send({
      msg: "Usuario - Autenticado",
      usuario: usuario, access_token: token
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  ctrlAuth,
};
