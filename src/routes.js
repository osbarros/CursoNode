const { Router } = require("express");

const rotas = Router();

rotas.get("", (req, res) => {
  return res.status(200).json({ "message": "teste" })
})

module.exports = rotas;