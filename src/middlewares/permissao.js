import jwt from "jsonwebtoken";
import ErroBase from "../erros/ErroBase.js";

class Auth{

  static autenticar (req, res, next) {
    const token = req.headers['authorization'];
    if(!token) {
      next(new ErroBase('Acesso Negado pois não foi fornecido um token', 401).enviarResposta());
    }
    
    try {
      const tokenSemPrefixo = token.slice(7);
      const decoded = jwt.verify(tokenSemPrefixo, process.env.KEY );
      req.usuario = decoded;
      next()
    }catch (error) {
      console.log(error)
      next(error)
    }
  }
  
  static permissao (nivelRequerido) {
    return (req, res, next) => {
      const { nivelDeAcesso } = req.usuario;
      
      if (nivelDeAcesso < nivelRequerido) {
        next(new ErroBase('Permissao negada, você não tem permissão para realizar a ação solicitada').enviarResposta());
      }
      next();
    }
  }
  
}
export default Auth