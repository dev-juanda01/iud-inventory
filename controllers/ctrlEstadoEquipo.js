"use strict";

const modeloEstadoEquipo = require("../models/estadoEquipo");

class CtrlEstadoEquipo {
  constructor() {}

  async obtenerEstadoEquipo(req, res) {
    try {
      let llave = "nombre",
        reqLlaves = Object.keys(req.query);

      if (!reqLlaves.includes(llave))
        return res
          .status(400)
          .send({ message: `Error en el nombre de la llave` });

      let nombre = await req.query.nombre.toUpperCase();
      const estadoEqipo = await modeloEstadoEquipo.find({ nombre });

      console.log(nombre, estadoEqipo);

      if (estadoEqipo.length == 0)
        return res
          .status(404)
          .send({ message: `El estado ${nombre} no es una opción admitida` });

      res.status(200).send(estadoEqipo);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al consultar a la base de datos ${error}` });
    }
  }

  async obtenerEstadoEquipos(req, res, next) {
    try {
      let llaves = Object.keys(req.query);
      if (llaves.length != 0) return next();

      const estadoEquipo = await modeloEstadoEquipo.find({});

      if (estadoEquipo.length == 0) {
        return res
          .status(404)
          .send({ message: `No se ecuentran estados de equipos` });
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

  async actualizarEstadoEquipo(req, res) {
    try {
      let idEstadoEquipo = req.query.id,
        dataEstadoEquipo = req.body;

      dataEstadoEquipo.fechaActualizacion = new Date();
      dataEstadoEquipo.nombre = req.body.nombre.toUpperCase();
      console.log(dataEstadoEquipo.nombre);

      const findEstadoEquipo = await modeloEstadoEquipo.findByIdAndUpdate(
        idEstadoEquipo,
        dataEstadoEquipo,
        { new: true }
      );

      if (!findEstadoEquipo) {
        return res.status(404).send({
          message: `El Estado de equipo con el id ${idEstadoEquipo} no existe`,
        });
      }

      return res.status(200).send({ findEstadoEquipo });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "error al conectar la base de datos " });
    }
  }

  async eliminarEstadoEquipo(req, res) {
    try {
      let idEstadoEquipo = await req.query.id,
        findEstadoEquipo = await modeloEstadoEquipo.findByIdAndDelete(
          idEstadoEquipo
        );

      if (findEstadoEquipo == undefined) {
        return res.status(404).send({
          message: `El estado de equipo con el id ${idEstadoEquipo} no existe`,
        });
      }

      return res
        .status(200)
        .send({ message: `el Estado de equipo ha sido eliminado` });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "error al conectar la base de datos " });
    }
  }
}

module.exports = new CtrlEstadoEquipo();
