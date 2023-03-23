"use strict";

const modeloInventario = require("../models/inventarios"),
  modeloUsuarios = require("../models/usuarios"),
  modeloMarcas = require("../models/marcaEquipo"),
  modeloEstados = require("../models/estadoEquipo"),
  modeloTipos = require("../models/tipoEquipo");

async function validarInventario(campo, nombre, modelo, res) {
  // console.log(campo, nombre, modelo, res);
  const modeloBusqueda = await modelo.findOne({
    _id: campo,
    estado: true,
  });

  if (!modeloBusqueda) {
    res.status(404).send({ message: `${nombre} invalido` });
    return false;
  }

  return true;
}

class CtrlInventario {
  constructor() {}
  async obtenerInventarios(req, res, next) {
    try {
      if (req.query.id) return next();
      const inventarios = await modeloInventario.find({});
      // console.log(inventarios);

      if (inventarios.length == 0) {
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
  async obtenerInventario(req, res) {
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

      console.log(req.body, usuario);

      if (!(await validarInventario(usuario, "usuario", modeloUsuarios, res)))
        return;
      if (!(await validarInventario(marca, "marca", modeloMarcas, res))) return;
      if (!(await validarInventario(estado, "estado", modeloEstados, res)))
        return;
      if (!(await validarInventario(tipo, "tipo", modeloTipos, res))) return;

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

      data.fechaActualizacion = new Date();

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
}

module.exports = new CtrlInventario();
