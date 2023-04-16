"use strict";

const modeloMarca = require("../models/marcaEquipo");

class CtrlMarcaEquipo {
  constructor() {}

  async obtenerMarcaEquipo(req, res) {
    try {
      let llave = "nombre",
        reqLlaves = Object.keys(req.query);

      if (!reqLlaves.includes(llave))
        return res
          .status(400)
          .send({ message: `Error en el nombre de la llave` });

      let nombre = await req.query.nombre.toUpperCase();
      const marca = await modeloMarca.find({ nombre });

      // console.log(nombre, estadoEqipo);

      if (marca.length == 0)
        return res.status(404).send({ message: `Marca no registrada` });

      res.status(200).send(marca);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al consultar a la base de datos ${error}` });
    }
  }

  async obtenerMarcaEquipos(req, res, next) {
    try {
      let llaves = Object.keys(req.query);
      if (llaves.length != 0) return next();

      const marcas = await modeloMarca.find({});

      if (marcas.length == 0) {
        return res
          .status(404)
          .send({ message: `No se ecuentran marcas registradas` });
      }

      return res.status(200).send(marcas);
    } catch (error) {
      return res.status(500).send({ message: `Error al consultar ${error}` });
    }
  }

  async ingresarMarcaEquipo(req, res) {
    // console.log(req.body);
    try {
      let nuevaMarcaEquipo = new modeloMarca();

      nuevaMarcaEquipo.nombre = req.body.nombre.toUpperCase();
      nuevaMarcaEquipo.estado = req.body.estado;

      nuevaMarcaEquipo.save();
      return res.status(201).send(nuevaMarcaEquipo);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "error al conectar la base de datos " });
    }
  }

  async actualizarMarcaEquipo(req, res) {
    try {
      let id = req.query.id,
        data = req.body;

      data.fechaActualizacion = new Date();

      const marca = await modeloMarca.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!marca) {
        return res.status(404).send({
          message: `la marca con el id ${id} no existe`,
        });
      }

      return res.status(200).send(marca);
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error al conectar a la base de datos ${error}` });
    }
  }

  async eliminarMarcaEquipo(req, res) {
    try {
      let id = await req.query.id,
        marca = await modeloMarca.findByIdAndDelete(id);

      if (!marca) {
        return res.status(404).send({
          message: `la marca con el id ${id} no existe`,
        });
      }

      return res.status(204).send({ message: `la marca ha sido eliminada` });
    } catch (error) {
      return res
        .status(500)
        .send({ message: `Error procesar la petición ${error}` });
    }
  }
}

module.exports = new CtrlMarcaEquipo();
