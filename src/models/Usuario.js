import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
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

usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const usuario = mongoose.model('usuario', usuarioSchema);

export default usuario;