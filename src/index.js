const app = require("./app");
const { Router } = require("express");

const rotas = Router();

rotas.get("", (req, res) => {
  return res.status(200).json({ "message": "teste" })
})

app.listen(4444, () => console.log("Servidor Rodando"))
app.use(rotas);