"use strict";

const modeloTipoEquipo = require("../models/tipoEquipo");

class CtrlTipoEquipo {
  constructor() {}

  async obtenerTipoEquipo(req, res) {
    let nombre = req.query;

    try {
      const tipoEquipo = await modeloTipoEquipo.find({ nombre });
      if (!tipoEquipo) {
        return res.status(404).send({});
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
  ingresarTipoEquipo(req, res) {}
  actualizarTipoEquipo(req, res) {}
  eliminarTipoEquipo(req, res) {}
}

module.exports = new CtrlTipoEquipo();
