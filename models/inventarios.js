"use strict";

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  inventario = Schema({
    serial: {
      type: String,
      required: true,
      unique: true,
    },
    modelo: {
      type: String,
      required: true,
      unique: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    foto: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    fechaCompra: {
      type: Date,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
      required: true,
    },
    marca: {
      type: Schema.Types.ObjectId,
      ref: "marca",
      required: true,
    },
    estado: {
      type: Schema.Types.ObjectId,
      ref: "estadoEquipo",
      required: true,
    },
    tipo: {
      type: Schema.Types.ObjectId,
      ref: "tipoEquipos",
      required: true,
    },
  });

module.exports = mongoose.model("inventario", inventario);
