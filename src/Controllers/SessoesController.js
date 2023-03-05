const SessoesModel = require("../Models/SessoesModel");

class SessoesController {
  async store(req, res) {
    const sessao = await SessoesModel.create(req.body);

    return res.status(200).json(sessao);
  }

  async index(req, res) {
    const sessoes = await SessoesModel.find();

    return res.status(200).json(sessoes);
  }

/*   async indexByUserId(req, res) {
    const { id } = req.params
    const sessao = await SessoesModel.findOne(id_usuario, id);
    return res.status(200).json(sessao);
  } */

  async destroy(req, res) {
    const { id } = req.params
    await SessoesModel.findByIdAndDelete(id);
    return res.status(200).json({ "mensagem": "Sessão encerrada com sucesso!" })
  }
}



module.exports = new SessoesController();