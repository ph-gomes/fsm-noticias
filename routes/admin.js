const express = require("express");

const Router = express.Router();

Router.get("/", (req, res) =>
  res.send("Área Administrativa - Acesso Restrito")
);
Router.get("/noticias", (req, res) => res.send("Noticias Administrativas"));

module.exports = Router;
