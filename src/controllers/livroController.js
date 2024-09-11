import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autor, livro} from "../models/index.js"
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js"
class LivroController {

  static async listarLivros (req, res, next) {
    try {
      let { limite = 5, pagina = 1, ordenacao = "_id:-1"} = req.query;

      limite = parseInt(limite);
      pagina = parseInt(pagina);
      const [campoOrder, ordem] = ordenacao.split(":");

      if( limite > 0 && pagina > 0) {
          const listarLivros = await livro.find({})
          .sort({[campoOrder]:ordem})
          .skip( (pagina-1) * limite )
          .limit(limite)
          .populate(["editora" ])
          .populate(["autor"])
          .exec();
        res.status(200).json(listarLivros);
      }else {
        next( new RequisicaoIncorreta());
      }

    } catch(erro) {
      next(erro);
    }
  };

  static async listarLivroPorId (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id).populate("autor").populate("editora").exec();
      if(livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncontrado("Livro não encontrado"));
      }
    } catch(erro) {
      next(erro);
    }
  };


  static async cadastrarLivros (req, res, next) {
    const novoLivro = req.body;
    try {
      const livroCriado = await livro.create(novoLivro);
      res.status(201).json({message: "criado com sucesso", livro: livroCriado});
    } catch (erro){
      next(erro);
    }
  }

  static async atualizarLivro (req, res, next) {
    try {
      const id = req.params.id
      const livroEncontrado = await livro.findByIdAndUpdate(id, req.body);
      if(livroEncontrado !== null){
        res.status(200).json({ message: "Livro atualizado"});
      } else{
        next(new NaoEncontrado("Livro não encontrado"));
      }
    } catch(erro) {
      next(erro);
    }
  };

  static async deletarLivro (req, res, next) {
    try {
      const id = req.params.id
      const livroEncontrado = await livro.findByIdAndDelete(id);
      if(livroEncontrado !== null) {
        res.status(200).json({ message: "Livro deletado"});
      } else{
        next(new NaoEncontrado("Livro não encontrado"));
      }
    } catch(erro) {
      next(erro);
    }
  };

  static async listarLivrosPorFiltro (req, res, next) {
    try{
        const {editora, titulo, nomeAutor } = req.query;

        let busca = {}
        if (editora) busca.editora = editora;
        if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
        if (nomeAutor) {
          const autorResultado = await autor.findOne({ nome: nomeAutor });
          if(autorResultado !== null) {
            busca.autor = autorResultado._id;
          } else {
            busca = null
          }
        }
        if (busca !== null) {
          const livrosPorFiltro = await livro.find(busca).populate("autor").populate("editora");
          if(livrosPorFiltro !== null) {
            res.status(200).json(livrosPorFiltro);
          } else {
            next(new NaoEncontrado("Nenhum livro foi encontrado"));
          }  
        } else {
          res.status(200).send([]);
        }
      } catch (erro) {
        next(erro);
      }
  };
};

export default LivroController;