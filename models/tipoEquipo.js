"use strict";

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  tipoEquipoSchema = Schema({
    nombre: {
      type: String,
      required: true,
      enum: ["computo", "moviles"],
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

module.exports = mongoose.model("tipoEquipo", tipoEquipoSchema);
