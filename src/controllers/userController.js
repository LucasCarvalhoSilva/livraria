import ErroBase from "../erros/ErroBase.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { usuario } from "../models/index.js";

class UserController {
  static async criarUsuario (req, res, next) {
    try {
      const novoUsuario = req.body;

      if( novoUsuario.nivelDeAcesso === 2) {
        const usuarioAutenticado = req.usuario;
        if(usuarioAutenticado.nivelDeAcesso !== 2) {
          next(ErroBase("Você não tem permissão para criar esse usuário", 403).enviarResposta());
        }
      }

      const usuarioCriado = await usuario.create(novoUsuario)
      res.status(201).json(usuarioCriado);
    } catch (error) {
      next(error);
    }
  };
  
  static async listarUsuarios (req, res, next) {
    try {
      const usuarios = await usuario.find();
      res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  };
  
  static async buscarUsuarioPorId (req, res, next) {
    try {
      const usuario = await usuario.findById(req.params.id);
      if (!usuario) {
        next(new NaoEncontrado("Usuário não encontrado"));
      }
      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  };

  static async atualizarUsuario (req, res, next) {
    try {
      const id = req.params.id;
      const { nickname, nome, sobrenome, senha, nivelDeAcesso } = req.body;
      const usuarioAutenticado = req.usuario;

      if(usuarioAutenticado.id !== id && usuario.usuarioAutenticado.nivelDeAcesso < 2) {
        next(ErroBase("Você não tem permissão para editar esse usuário", 403).enviarResposta());
      }

      const usuarioAtualizado = await usuario.findByIdAndUpdate(
        id,
        { nickname, nome, sobrenome, senha, nivelDeAcesso }
      );
      if (!usuarioAtualizado) {
        next(new NaoEncontrado("Usuário não encontrado"));
      }
      res.status(200).json(usuarioAtualizado);
    } catch (error) {
      next(error);
    }
  };
  
  static async deletarUsuario (req, res, next) {
    try {
      const usuarioDeletado = await usuario.findByIdAndDelete(req.params.id);
      if (!usuarioDeletado) {
        next(new NaoEncontrado("Usuário não encontrado"));
      }
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;