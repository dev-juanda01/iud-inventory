"use strict";

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  tipoEquipoSchema = Schema({
    nombre: {
      type: String,
      required: true,
      enum: ["COMPUTO", "MOVILES"],
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

module.exports = mongoose.model("tipoEquipos", tipoEquipoSchema);
