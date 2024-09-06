import express from "express";
import EditoraController from "../controllers/editoraController.js";


const routes = express.Router();

routes.get("/editora", EditoraController.listarEditora);
routes.get("/editora/:id", EditoraController.listarEditoraPorId);
routes.post("/editora", EditoraController.cadastrarEditora);
routes.put("/editora/:id", EditoraController.atualizarEditora);
routes.delete("/editora/:id", EditoraController.deletarEditora);

export default routes