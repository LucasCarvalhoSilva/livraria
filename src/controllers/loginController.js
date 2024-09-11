import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { usuario } from "../models/index.js";
import UsuarioOuSenhaInvalidos from "../erros/UsuarioOuSenhaInvalidos.js";

class LoginController {
  static async login (req, res, next) {
    try{
      const {nickname, senha} = req.body;

      const user = await usuario.findOne({nickname});

      if(!user) {
        next(new UsuarioOuSenhaInvalidos().enviarResposta());
      }

      const senhaValida = await bcrypt.compare(senha, user.senha);
      if(!senhaValida) {
        next(new UsuarioOuSenhaInvalidos().enviarResposta());
      }
      console.log(user._id, senha )
      const token = jwt.sign(
        {
          id: user._id,
          nivelDeAcesso: user.nivelDeAcesso
        },
        process.env.KEY,
        {expiresIn: '1h'}
      );
      console.log("Token do usuario")
      res.status(200).json({
        message: 'Login realizado com sucesso',
        token
      })
    } catch(error) {
      next(error)
    }
  } 
    
}

export default LoginController;