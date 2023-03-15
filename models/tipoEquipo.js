"use strict";

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  tipoEquipoSchema = Schema({
    nombre: String,
    estado: { type: String, enum: ["activo", "inactivo"] },
    fechaCreacion: String,
    fechaActualizacion: String,
  });

module.exports = mongoose.model("tipoEquipo", tipoEquipoSchema);
