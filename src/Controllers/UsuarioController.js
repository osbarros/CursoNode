const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {
  async store(req, res){
    console.log("chegou");
    const usuario = await UsuarioModel.create(req.body);

    return res.status(200).json(usuario);
  }

  async index(){
    console.log("chegou");
  }

  async indexByUserId(){

  }

  async update(){

  }

  async destroy(){

  }
}

module.exports = new UsuarioController();