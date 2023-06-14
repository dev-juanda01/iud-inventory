"use strict";

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  usuarios = Schema({
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          if (
            !/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(
              value
            )
          ) {
            return false;
          }
        },
        message: `No es un correo valido`,
      },
    },
    contrasena: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true,
      enum: [ 'ADMIN', 'DOCENTE'],
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

module.exports = mongoose.model("usuarios", usuarios);
