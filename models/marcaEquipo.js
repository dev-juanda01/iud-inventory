"use strict";

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  marcaEquipoSchema = Schema({
    nombre: {
      type: String,
      required: true,
    },
    estado: {
      type: Boolean,
      required: true,
    },
    fechaCreacion: {
      type: Date,
      default: new Date(),
    },
    fechaActualizacion: {
      type: Date,
      default: new Date(),
    },
  });

module.exports = mongoose.model("marcaEquipos", marcaEquipoSchema);
