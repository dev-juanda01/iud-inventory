"use strict";

const app = require("../app"),
  server = app.listen(app.get("port"), () => {
    console.log(`Servidor corriendo en http://localhost:${app.get("port")}`);
  });
