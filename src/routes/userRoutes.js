import express from "express";
import UserController from "../controllers/userController.js";
import Auth from "../middlewares/permissao.js";

const routes = express.Router();

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: Não autorizado
 */
routes.get("/usuario",Auth.autenticar, Auth.permissao(1), UserController.listarUsuarios);
/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Lista um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do usuario
 *       404:
 *         description: Usuário não encontrado
 */
routes.get("/usuario/:id", Auth.autenticar, Auth.permissao(1), UserController.buscarUsuarioPorId);
/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados do novo usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       401:
 *         description: Não autorizado
 */
routes.post("/usuario", Auth.autenticar, Auth.permissao(1), UserController.criarUsuario);
/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados atualizados do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       401:
 *         description: Não autorizado
 */
routes.put("/usuario/:id", Auth.autenticar, Auth.permissao(1), UserController.atualizarUsuario);
/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Deleta um usuário por ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       401:
 *         description: Não autorizado
 */
routes.delete("/usuario/:id", Auth.autenticar, Auth.permissao(2), UserController.deletarUsuario);

export default routes