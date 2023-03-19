"use strict";
const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  estadoEquipoSchema = Schema({
    nombre: {
      type: String,
      required: true,
      enum: ["EN USO", "EN BODEGA", "DEPRECIADO"],
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

module.exports = mongoose.model("estadoEquipo", estadoEquipoSchema);
