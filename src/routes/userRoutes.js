import express from "express";
import UserController from "../controllers/userController.js";
import Auth from "../middlewares/permissao.js";

const routes = express.Router();

routes.get("/usuario",Auth.autenticar, Auth.permissao(1), UserController.listarUsuarios);
routes.get("/usuario/:id", Auth.autenticar, Auth.permissao(1), UserController.buscarUsuarioPorId);
routes.post("/usuario", Auth.autenticar, Auth.permissao(1), UserController.criarUsuario);
routes.put("/usuario/:id", Auth.autenticar, Auth.permissao(1), UserController.atualizarUsuario);
routes.delete("/usuario/:id", Auth.autenticar, Auth.permissao(2), UserController.deletarUsuario);

export default routes