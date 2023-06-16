"use strict";

const modeloUsuarios = require("../models/usuarios");
const bcrypjs = require("bcryptjs");

class CtrlUsuario {
  constructor() {}

  async obtenerUsuarios(req, res, next) {
    try {
      if (req.query.nombre) return next();

      const usuarios = await modeloUsuarios.find({});

      if (usuarios.length == 0)
        return res
          .status(404)
          .send({ message: `Usuarios no registrados en la base de datos` });

      return res.status(200).send(usuarios);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al consultar en la base de datos ${error}` });
    }
  }

  async obtenerUsuario(req, res) {
    try {
      let nombre = await req.query.nombre;

      const usuario = await modeloUsuarios.find({ nombre });
      console.log(usuario);

      if (!usuario)
        return res
          .status(404)
          .send({ message: `Usuario no registrado en la base de datos` });
      return res.status(200).send(usuario);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al consultar en la base de datos ${error}` });
    }
  }

  async ingresarUsuarios(req, res) {
    try {
      const { nombre, email, contrasena, rol, estado } = req.body;
      const nuevoUsuario = new modeloUsuarios({
        nombre,
        email,
        contrasena,
        rol,
        estado,
      });

      const salt = bcrypjs.genSaltSync();
      nuevoUsuario.contrasena = bcrypjs.hashSync(contrasena, salt);

      nuevoUsuario.save();
      return res.status(201).send(nuevoUsuario);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: `Error al consutar en la base de datos ${error}` });
    }
  }

  async actualizarUsuario(req, res) {
    try {
      const { id } = await req.params
      const data = req.body;

      data.fechaActualizacion = new Date();
      
      
      if (data.contrasena !=  undefined){
        const salt = bcrypjs.genSaltSync();
        data.contrasena = bcrypjs.hashSync(data.contrasena, salt);
      }
        
      const usuario = await modeloUsuarios.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!usuario)
        return res
          .status(404)
          .send({ message: `El usuario con id ${id} no existe` });

      res.status(200).send(usuario);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al consultar en la base de datos ${error}` });
    }
  }

  async eliminarUsuario(req, res) {
    try {
      const { id } = await req.params

      const usuario = await modeloUsuarios.findByIdAndDelete(id);

      if (!usuario)
        return res
          .status(404)
          .send({ message: `Usuario con id ${id} no existe` });

      res.status(204).send({ message: `Usuario eliminado` });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al conectar a la base de datos ${error}` });
    }
  }
}

module.exports = new CtrlUsuario();
