"use strict";

const modeloEstadoEquipo = require("../models/estadoEquipo");

class CtrlEstadoEquipo {
  constructor() {}

  async obtenerEstadoEquipo(req, res) {
    try {
      let nombre = await req.query.nombre.tuUpperCase();
      const estadoEqipo = await modeloEstadoEquipo.find({ nombre });

      if (estadoEqipo.length == 0)
        return res.status(404).send({ message: `No hay estados a consultar` });

      res.status(200).send(estadoEqipo);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Error al consultar a la base de datos" });
    }
  }

  async obtenerEstadoEquipos(req, res) {
    try {
      let estado = req.query.estado;
      const estadoEquipo = await modeloEstadoEquipo.find({ estado });

      if (estadoEquipo.length == 0) {
        return res
          .status(404)
          .send({ message: `No se ecuentran tipos de equipos` });
      }

      return res.status(200).send({ estadoEquipo });
    } catch (error) {
      return res.status(500).send({ message: `Error al consultar ${error}` });
    }
  }

  async ingresarEstadoEquipo(req, res) {
    console.log(req.body);
    try {
      let nuevoEstadoEquipo = new modeloEstadoEquipo();

      nuevoEstadoEquipo.nombre = req.body.nombre.toUpperCase();
      nuevoEstadoEquipo.estado = req.body.estado;

      nuevoEstadoEquipo.save();
      return res.status(201).send(nuevoEstadoEquipo);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "error al conectar la base de datos " });
    }
  }
  actualizarEstadoEquipo(req, res) {}
  eliminarEstadoEquipo(req, res) {}
}

module.exports = new CtrlEstadoEquipo();
