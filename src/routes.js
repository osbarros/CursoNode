const { Router } = require("express");
const UsuarioController = require("./Controllers/UsuarioController");

const rotas = Router();

rotas.get("", (req, res) => {
  return res.status(200).json({ "message": "teste" })
})

rotas.post('/usuarios', UsuarioController.store)
rotas.get('/usuarios', UsuarioController.index)
rotas.get('/usuarios/:id', UsuarioController.indexByUserId)
rotas.put('/usuarios/:id', UsuarioController.update);
rotas.delete('/usuarios/:id', UsuarioController.destroy);


module.exports = rotas;