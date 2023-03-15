"use strict";

const modeloTipoEquipo = require("../models/tipoEquipo");

class CtrlTipoEquipo {
  constructor() {}

  async obtenerTipoEquipo(req, res) {
    let idTE = req.params.idTE;

    try {
      const tipoEquipo = await modeloTipoEquipo.findById(idTE);
      if (!tipoEquipo) {
        return res.status(404).send({});
      }

      return res.status(200).send(tipoEquipo);
    } catch (error) {
      return res.status(500).send({});
    }
  }
  obtenerTipoEquipos(req, res) {}
  ingresarTipoEquipo(req, res) {}
  actualizarTipoEquipo(req, res) {}
  eliminarTipoEquipo(req, res) {}
}

module.exports = new CtrlTipoEquipo();
