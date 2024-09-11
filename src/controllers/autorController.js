import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autor} from "../models/index.js";

class AutorController {

  static async listarAutor (req, res, next) {
    try {
      let { limite = 5, pagina = 1 } = req.query;

      limite = parseInt(limite);
      pagina = parseInt(pagina);
      const listarAutor = await autor.find({})
        .skip( (pagina-1) * limite )
        .limit(limite);
      res.status(200).json(listarAutor);
    } catch(erro) {
      next(erro);
    }
  };

  static async listarAutorPorId (req, res, next) {
    try {
      const id = req.params.id
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado"))
      }

    } catch(erro) {
      next(erro);
    }
  };


  static async cadastrarAutor (req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      
      res.status(201).json({message: "criado com sucesso", autor: novoAutor});
    } catch (erro){
      next(erro);
    }
  }

  static async atualizarAutor (req, res, next) {
    try {
      const id = req.params.id
      const autorResultado = await autor.findByIdAndUpdate(id, req.body);
      if(autorResultado !== null ) {
        res.status(200).json({ message: "Autor atualizado"});
      } else {
        next(new NaoEncontrado("ID do autor não encontrado"));
      }
    } catch(erro) {
      next(erro);
    }
  };

  static async deletarAutor (req, res, next) {
    try {
      const id = req.params.id
      const autorResultado = await autor.findByIdAndDelete(id);
      if(autorResultado !== null ) {
        res.status(200).json({ message: "Autor deletado"});
      }else {
        next(new NaoEncontrado("ID do autor não encontrado"));
      }
    } catch(erro) {
      next(erro);
    }
  };
};

export default AutorController;