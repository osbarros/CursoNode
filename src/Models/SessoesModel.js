const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const id = Schema.ObjectId;

const SessoesSchema = new Schema({
  id: id,
  id_usuario: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios'
  }

}, {
  timestamps: true
})

const SessoesModel = mongoose.model('sessoes', SessoesSchema);

module.exports = SessoesModel;