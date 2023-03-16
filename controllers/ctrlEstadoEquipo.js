"use strict";

const modeloEstadoEquipo = require("../models/estadoEquipo");

class CtrlEstadoEquipo {
  constructor() {}

  async obtenerEstadoEquipo(req, res) {
    let estado = req.query.estado;

    try {
      const estadoEquipo = await modeloEstadoEquipo.find({ estado });
      if (estadoEquipo) {
        return res
          .status(404)
          .send({ message: `No se ecuentran tipos de equipos` });
      }

      return res.status(200).send(estadoEquipo);
    } catch (error) {
      return res.status(500).send({});
    }
  }

  async ingresarEstadoEquipo(req, res) {
    console.log(req.body);
    try {
      let nuevoEstadoEquipo = new modeloEstadoEquipo();

      nuevoEstadoEquipo.nombre = req.body.nombre;
      nuevoEstadoEquipo.estado = req.body.estado;
      nuevoEstadoEquipo.fechaCreacion = req.body.fechaCreacion;
      nuevoEstadoEquipo.fechaActualizacion = req.body.fechaActualizacion;

      nuevoEstadoEquipo.save();

      return res.status(201).send({ nuevoEstadoEquipo });
    } catch (error) {
      return res;
       .statu(500)
       .send({message: "error al conectar la base de datos " })
    }
  }


  ingresarEstadoEquipo(req, res) {}
  actualizarEstadoEquipo(req, res) {}
  eliminarEstadoEquipo(req, res) {}
}

module.exports = new CtrlEstadoEquipo();
