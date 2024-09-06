import express from "express";
import AutorController from "../controllers/autorController.js";

const routes = express.Router();

routes.get("/autor", AutorController.listarAutor);
routes.get("/editora/:id", AutorController.listarAutorPorId);
routes.post("/autor", AutorController.cadastrarAutor);
routes.put("/editora/:id", AutorController.atualizarAutor);
routes.delete("/editora/:id", AutorController.deletarAutor);

export default routes