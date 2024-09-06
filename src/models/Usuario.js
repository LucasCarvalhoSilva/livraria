import mongoose from "mongoose";
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  nome: {
    type: String,
    required: true
  },
  sobrenome: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  nivelDeAcesso: {
    type: Number,
    required: true,
    enum: [1, 2]  //  1 = usuário comum 2 = admin
  }
}, {
  timestamps: true
});

const usuario = mongoose.model('Usuario', usuarioSchema);

export default usuario;