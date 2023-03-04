const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const id = Schema.ObjectId;

const UsuarioSchema = new Schema({
  id: id,
  email: String, 
  senha: String, 
  nome: String,
  cargo: String,
  status: String
})

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

module.exports = UsuarioModel;