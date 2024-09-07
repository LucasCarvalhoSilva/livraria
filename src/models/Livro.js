import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { 
    type: String, 
    required: [true, "O título do livro é obrigatório"] 
  },
  editora: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "editoras",
    required: [true, "A editora é obrigatorio"]
  }],
  preco: { type: Number },
  paginas: { 
    type: Number,
    min: [10, "O número de páginas precisa estar entre 10 e 5000. Valor fornecido: {VALUE}"],
    max: [5000, "O número de páginas precisa estar entre 10 e 5000 Valor fornecido: {VALUE}"]
  },
  autor: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O autor é obrigatorio" ]
  }]
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;