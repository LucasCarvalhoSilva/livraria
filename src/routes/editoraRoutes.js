import express from "express";
import EditoraController from "../controllers/editoraController.js";
import Auth from "../middlewares/permissao.js";

const routes = express.Router();

routes.get("/editora", Auth.autenticar, Auth.permissao(1), EditoraController.listarEditora);
routes.get("/editora/:id", Auth.autenticar, Auth.permissao(1), EditoraController.listarEditoraPorId);
routes.post("/editora", Auth.autenticar, Auth.permissao(1), EditoraController.cadastrarEditora);
routes.put("/editora/:id", Auth.autenticar, Auth.permissao(1), EditoraController.atualizarEditora);
routes.delete("/editora/:id", Auth.autenticar, Auth.permissao(1), EditoraController.deletarEditora);

export default routes