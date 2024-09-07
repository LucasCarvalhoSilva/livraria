import express from "express";
import LivroController from "../controllers/livroController.js";
import Auth from "../middlewares/permissao.js";

const routes = express.Router();

routes.get("/livros", Auth.autenticar, LivroController.listarLivros);
routes.get("/livros/busca", Auth.autenticar,  LivroController.listarLivrosPorFiltro);
routes.get("/livros/:id", Auth.autenticar,  LivroController.listarLivroPorId);
routes.post("/livros", Auth.autenticar,  LivroController.cadastrarLivros);
routes.put("/livros/:id", Auth.autenticar,  LivroController.atualizarLivro);
routes.delete("/livros/:id", Auth.autenticar,  LivroController.deletarLivro);

export default routes