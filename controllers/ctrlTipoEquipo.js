"use strict";

const modeloTipoEquipo = require("../models/tipoEquipo");

class CtrlTipoEquipo {
  constructor() {}

  async obtenerTipoEquipo(req, res) {
    try {
      let nombre = req.query.nombre;
      const tipoEquipo = await modeloTipoEquipo.find({ nombre });

      if (tipoEquipo.length == 0) {
        return res.status(404).send({ message: `tipo no encontrado` });
      }

      return res.status(200).send(tipoEquipo);
    } catch (error) {
      return res.status(500).send({});
    }
  }

  async obtenerTipoEquipos(req, res) {
    try {
      const tipoEquipos = await modeloTipoEquipo.find({});
      console.log(tipoEquipos);

      if (tipoEquipos.length == 0)
        return res
          .status(404)
          .send({ message: `No se ecuentran tipos de equipos` });

      res.status(200).send({ tipoEquipos });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al consultar en la base de datos ${error}` });
    }
  }
  async ingresarTipoEquipo(req, res) {
    console.log(req.body);
    try {
      let nuevoTipoEquipo = new modeloTipoEquipo();

      nuevoTipoEquipo.nombre = req.body.nombre;
      nuevoTipoEquipo.estado = req.body.estado;

      nuevoTipoEquipo.save();
      return res.status(201).send({ nuevoTipoEquipo });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al conectar a la base de datos ${error}` });
    }
  }
  actualizarTipoEquipo(req, res) {}
  eliminarTipoEquipo(req, res) {}
}

module.exports = new CtrlTipoEquipo();
