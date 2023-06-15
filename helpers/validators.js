const { validarCampos } = require("../middlewares/validar_campos");
const Usuario = require("../models/usuarios");

const correoExiste = async (correo = "") => {
  const existeCorreo = await Usuario.findOne({ correo });

  if (existeCorreo) {
    throw new Error(`El correo ${correo} ya existe en la base de datos`);
  }
};

const idExiste = async (id = "") => {
  const existeId = await Usuario.findById(id);

  if (!existeId) {
    throw new Error(`El id ${id} no existe en la base de datos`);
  }
};

const contrasenaExiste = async (contrasena = "") => {
  //TODO: pasarle el correo del usuario a comparar

  const contrasenaEsIgual = bycript.compareSync(contrasena, Usuario.contrasena);

  if (!contrasenaEsIgual) {
    throw new Error(
      `La contraseña ${contrasena} no existe en la base de datos`
    );
  }
};

module.exports = {
  correoExiste,
  idExiste,
};

//TODO: Validar si el id por usuario existe para implementarlo en el post
//de actualizar y eliminar usuarios con los metodos:
// const idExiste
// const rolExiste

// TODO: validar el jwt.
