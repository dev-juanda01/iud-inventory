"use strict";

const app = require("../app"),
  dbConnection = require("../database/mongoConnection");

dbConnection();

app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en http://localhost:${app.get("port")}`);
});
