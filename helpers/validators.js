const Usuario = require("../models/usuarios");

const correoExiste = async (correo = "") => {
  const existeCorreo = await Usuario.findOne({ correo });

  if (existeCorreo) {
    throw new Error(`El correo ${correo} ya existe en la base de datos`);
  }
};


module.exports = {
  correoExiste
};




//TODO: Validar si el id por usuario existe para implementarlo en el post
//de actualizar y eliminar usuarios con los metodos: 
// const idExiste
// const rolExiste

// TODO: validar el jwt.


