"use strict";

const modeloTipoEquipo = require("../models/tipoEquipo"),
  { request, response } = require("express");

class CtrlTipoEquipo {
  constructor() {}

  async obtenerTipoEquipo(req = request, res = response) {
    try {
      let nombre = req.query.nombre.toUpperCase();
      const tipoEquipo = await modeloTipoEquipo.find({ nombre });

      if (tipoEquipo.length == 0) {
        return res.status(404).send({ message: `Tipo ${nombre} no encontrado` });
      }
      return res.status(200).send(tipoEquipo);
    } catch (error) {
      return res.status(500).send({});
    }
  }

  async obtenerTipoEquipos(req, res, next) {
    try {
      if (req.query.nombre) return next();

      const tipoEquipos = await modeloTipoEquipo.find({});
      // console.log(tipoEquipos);

      if (tipoEquipos.length == 0)
        return res
          .status(404)
          .send({ message: `No se ecuentran tipos de equipos` });

      console.log("Ejecute todos");
      res.status(200).send(tipoEquipos);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al consultar en la base de datos ${error}` });
    }
  }
  async ingresarTipoEquipo(req, res) {
    console.log(req.body);
    try {
      let nombre = req.body.nombre ? req.body.nombre.toUpperCase() : "",
        buscarTipo = await modeloTipoEquipo.findOne({ nombre });
      console.log(buscarTipo);

      if (buscarTipo)
        return res.status(409).send({ message: `El tipo ya existe` });

      let nuevoTipoEquipo = new modeloTipoEquipo();

      nuevoTipoEquipo.nombre = nombre;
      nuevoTipoEquipo.estado = req.body.estado;

      nuevoTipoEquipo.save();
      return res.status(201).send({ nuevoTipoEquipo });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al conectar a la base de datos ${error}` });
    }
  }

  async actualizarTipoEquipo(req, res) {
    try {
      let idTipoEquipo = req.query.id,
        dataTipoEquipo = req.body;

      dataTipoEquipo.fechaActualizacion = new Date();

      const findTipoEquipo = await modeloTipoEquipo.findByIdAndUpdate(
        idTipoEquipo,
        dataTipoEquipo,
        { new: true }
      );

      if (findTipoEquipo == undefined) {
        return res.status(404).send({
          message: `El tipo de equipo con el id ${idTipoEquipo} no existe`,
        });
      }

      return res.status(200).send({ findTipoEquipo });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al conectar a la base de datos ${error}` });
    }
  }

  async eliminarTipoEquipo(req, res) {
    try {
      let idTipoEquipo = await req.query.id,
        findTipoEquipo = await modeloTipoEquipo.findByIdAndDelete(idTipoEquipo);

      if (findTipoEquipo == undefined) {
        return res.status(404).send({
          message: `El tipo de equipo con el id ${idTipoEquipo} no existe`,
        });
      }

      return res
        .status(200)
        .send({ message: `el tipo de equipo ha sido eliminado` });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al conectar a la base de datos ${error}` });
    }
  }
}

module.exports = new CtrlTipoEquipo();
