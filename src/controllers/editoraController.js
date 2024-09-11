import NaoEncontrado from "../erros/NaoEncontrado.js";
import {editora} from "../models/index.js";

class EditoraController {

  static async listarEditora (req, res, next) {
    try {
      let { limite = 5, pagina = 1 } = req.query;

      limite = parseInt(limite);
      pagina = parseInt(pagina);
      
      const listarEditora = await editora.find({})
        .skip( (pagina-1) * limite )
        .limit(limite);
      res.status(200).json(listarEditora);
    } catch(erro) {
      next(erro);
    }
  };

  static async listarEditoraPorId (req, res, next) {
    try {
      const id = req.params.id
      const editoraEncontrada = await editora.findById(id);

      if (editoraEncontrada !== null) {
        res.status(200).json(editoraEncontrada);
      } else {
        next(new NaoEncontrado("Id da Editora não localizado"))
      }

    } catch(erro) {
      next(erro);
    }
  };


  static async cadastrarEditora (req, res, next) {
    console.log("Here")
    try {
      const novaEditora = await editora.create(req.body);
      
      res.status(201).json({message: "criado com sucesso", editora: novaEditora});
    } catch (erro){
      next(erro);
    }
  }

  static async atualizarEditora (req, res, next) {
    try {
      const id = req.params.id
      const editoraResultado = await editora.findByIdAndUpdate(id, req.body);
      if(editoraResultado !== null ) {
        res.status(200).json({ message: "Editora atualizada"});
      } else {
        next(new NaoEncontrado("ID da editora não encontrado"));
      }
    } catch(erro) {
      next(erro);
    }
  };

  static async deletarEditora (req, res, next) {
    try {
      const id = req.params.id
      const editoraResultado = await editora.findByIdAndDelete(id);
      if(editoraResultado !== null ) {
        res.status(200).json({ message: "Editor deletado"});
      }else {
        next(new NaoEncontrado("ID da editora não encontrado"));
      }
    } catch(erro) {
      next(erro);
    }
  };
};

export default EditoraController;