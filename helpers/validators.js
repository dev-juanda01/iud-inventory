const { validarCampos } = require("../middlewares/validar_campos");
const Usuario = require("../models/usuarios");
const EstadoEquipo = require("../models/estadoEquipo");
const MarcaEquipo = require("../models/marcaEquipo");
const TipoEquipo = require("../models/tipoEquipo");
const Inventario = require("../models/inventarios");

const correoExiste = async (correo = "") => {
  const existeCorreo = await Usuario.findOne({ correo });

  if (existeCorreo) {
    throw new Error(`El correo ${correo} ya existe en la base de datos`);
  }
};

const usuarioExiste = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`El id del usuario ${id} no existe en la base de datos`);
  }
};

const estadoEquipoExiste = async (id = "") => {
  const existeEstadoEquipo = await EstadoEquipo.findById(id);

  if (!existeEstadoEquipo) {
    throw new Error(
      `El id del estado equipo ${id} no existe en la base de datos`
    );
  }
};

const marcaEquipoExiste = async (id = "") => {
  const existeMarcaEquipo = await MarcaEquipo.findById(id);

  if (!existeMarcaEquipo) {
    throw new Error(
      `El id del la marca de equipo ${id} no existe en la base de datos`
    );
  }
};

const tipoEquipoExiste = async (id = "") => {
  const existeTipoEquipo = await TipoEquipo.findById(id);

  if (!existeTipoEquipo) {
    throw new Error(
      `El id del tipo de equipo ${id} no existe en la base de datos`
    );
  }
};

const inventarioExiste = async (id = "") => {
  const existeInventario = await Inventario.findById(id);

  if (!existeInventario) {
    throw new Error(`El id del inventario ${id} no existe en la base de datos`);
  }
};

// const contrasenaExiste = async (contrasena = "") => {

//   const { email, contrasena } = req.body;

//   const contrasenaEsIgual = bycript.compareSync(contrasena, ...);

//   if (!contrasenaEsIgual) {
//     throw new Error(
//       `La contraseña ${contrasena} no existe en la base de datos`
//     );
//   }
// };

module.exports = {
  correoExiste,
  usuarioExiste,
  estadoEquipoExiste,
  marcaEquipoExiste,
  tipoEquipoExiste,
  inventarioExiste,
};
