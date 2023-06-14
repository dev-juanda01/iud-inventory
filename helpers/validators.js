const Usuario = require("../models/usuarios");

const correoExiste = async (correo = "") => {
  const existeCorreo = await Usuario.findOne({ correo });

  if (existeCorreo) {
    throw new Error(`El correo ${correo} ya existe en la base de datos`);
  }
};

module.exports = {
  correoExiste,
};
