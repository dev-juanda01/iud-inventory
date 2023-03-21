"use strict";

const modeloInventario = require("../models/inventarios"),
  modeloUsuarios = require("../models/usuarios"),
  modeloMarcas = require("../models/marcaEquipo"),
  modeloEstados = require("../models/estadoEquipo"),
  modeloTipos = require("../models/tipoEquipo");

class CtrlInventario {
  constructor() {}

  async obtenerInventario(req, res) {
    try {
      const inventarios = await modeloInventario.find({});

      if (!inventarios) {
        return res
          .status(404)
          .send({ message: `No hay inventarios registrados` });
      }

      res.status(200).send(inventarios);
    } catch (error) {
      res
        .status(500)
        .send({ message: `Error al consultar en la base de datos ${error}` });
    }
  }
  async obtenerInventarios(req, res) {
    try {
      const id = req.query.id,
        inventario = await modeloInventario.findById(id);

      if (!inventario) {
        res
          .status(404)
          .send({ message: `No existe el inventario con id ${id}` });
      }

      res.status(200).send(inventario);
    } catch (error) {
      res
        .status(500)
        .send({ message: `Error al consultar en la base de datos ${error}` });
    }
  }
  async ingresarInventario(req, res) {
    try {
      let data = await req.body,
        { usuario, marca, estado, tipo } = req.body;

      await this.validarInventario(usuario, "usuario", modeloUsuarios, res);
      await this.validarInventario(marca, "marca", modeloMarcas, res);
      await this.validarInventario(estado, "estado", modeloEstados, res);
      await this.validarInventario(tipo, "tipo", modeloTipos, res);

      const nuevoInventario = new modeloInventario(data);
      nuevoInventario.save();
      res.status(201).send(nuevoInventario);
    } catch (error) {
      res
        .status(500)
        .send({ message: `Error al consultar en la base de datos ${error}` });
    }
  }
  async actualizarInventario(req, res) {
    try {
      let id = req.query.id,
        data = req.body;

      const inventario = await modeloInventario.findByIdAndUpdate(id, data);

      if (!inventario)
        return res
          .status(404)
          .send({ message: `No existe un inventario con id ${id}` });

      res.status(200).send(inventario);
    } catch (error) {
      res
        .status(500)
        .send({ message: `Error al consultar en la base de datos ${error}` });
    }
  }
  async eliminarInventario(req, res) {
    try {
      let id = req.query.id;

      const eliminado = await modeloInventario.findByIdAndDelete(id);

      if (!eliminado)
        return res
          .status(404)
          .send({ message: `No existe un inventario con id ${id}` });

      res.status(200).send({ message: `Inventario eliminado exitosamente` });
    } catch (error) {
      res.status(500).send({
        message: `Error al consultar en la base de datos ${error}`,
      });
    }
  }

  async validarInventario(campo, nombre, modelo, res) {
    const modeloBusqueda = await modelo.findOne({
      _id: campo.id,
      estado: true,
    });

    if (!modeloBusqueda) {
      return res.status(404).send({ message: `${nombre} invalido` });
    }
  }
}

module.exports = new CtrlInventario();
