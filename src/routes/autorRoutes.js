import express from "express";
import AutorController from "../controllers/autorController.js";
import Auth from "../middlewares/permissao.js";

const routes = express.Router();
//rota para buscar todos os autores cadastrados
routes.get("/autor", Auth.autenticar, Auth.permissao(1), AutorController.listarAutor);
//rota para buscar autor pelo id
routes.get("/autor/:id", Auth.autenticar, Auth.permissao(1), AutorController.listarAutorPorId);
//rota para cadastrar autor
routes.post("/autor", Auth.autenticar, Auth.permissao(1), AutorController.cadastrarAutor);
//rota para editar autor
routes.put("/autor/:id", Auth.autenticar, Auth.permissao(1), AutorController.atualizarAutor);
//rota para excluir autor
routes.delete("/autor/:id", Auth.autenticar, Auth.permissao(1), AutorController.deletarAutor);

export default routes