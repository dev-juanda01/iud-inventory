"use strict";

const modeloUsuarios = require("../models/usuarios");

class CtrlUsuario {
  constructor() {}

  async obtenerUsuarios(req, res, next) {
    try {
      if (req.query.id) return next();

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
      let id = await req.query.id;

      const usuario = modeloUsuarios.findById(id);
      console.log(usuario);

      if (usuario)
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
      const { nombre, email, estado } = req.body,
        data = {
          nombre,
          email,
          estado,
        };

      let nuevoUsuario = new modeloUsuarios(data);
      nuevoUsuario.save();
      return res.status(201).send(nuevoUsuario);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al consutar en la base de datos ${error}` });
    }
  }

  async actualizarUsuario(req, res) {
    try {
      let id = await req.query.id,
        data = req.body;

      data.fechaActualizacion = new Date();

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
      let id = req.query.id;

      const usuario = await modeloUsuarios.findByIdAndDelete(id);

      if (!usuario)
        return res
          .status(404)
          .send({ message: `Usuario con id ${id} no existe` });

      res.status(200).send({ message: `Usuario eliminado` });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al conectar a la base de datos ${error}` });
    }
  }
}

module.exports = new CtrlUsuario();
