const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {
  async store(req, res) {
    const usuario = await UsuarioModel.create(req.body);

    return res.status(200).json(usuario);
  }

  async index(req, res) {
    const usuarios = await UsuarioModel.find();

    return res.status(200).json(usuarios)
  }

  async indexByUserId(req, res) {
    const { id } = req.params;
    const usuario = await UsuarioModel.findById(id);

    return res.status(200).json(usuario);
  }

  async update(req, res) {
    const { id } = req.params;
    const dados = req.body;

    await UsuarioModel.findByIdAndUpdate(id, dados);

    return res.status(200).json({ "mensagem": "Usuário atualizado com sucesso!" });
  }

  async destroy(req, res) {
    const { id } = req.params;

    await UsuarioModel.findByIdAndDelete(id);

    return res.status(200).json({ "mensagem": "Usuário deletado com sucesso!" });

  }
}

module.exports = new UsuarioController();