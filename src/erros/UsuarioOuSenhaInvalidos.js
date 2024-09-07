import ErroBase from "./ErroBase.js";

class UsuarioOuSenhaInvalidos extends ErroBase {
  constructor(mensagem = "Usuario ou senha Inválidos") {
    super(mensagem, 401);
  }
}

export default UsuarioOuSenhaInvalidos;