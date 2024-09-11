import express from "express";
import AutorController from "../controllers/autorController.js";
import Auth from "../middlewares/permissao.js";

const routes = express.Router();
/**
 * @swagger
 * /autor:
 *   get:
 *     summary: Lista todos os autores
 *     tags: [Autores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de Autores
 *       401:
 *         description: Não autorizado
 */
routes.get("/autor", Auth.autenticar, Auth.permissao(1), AutorController.listarAutor);
/**
 * @swagger
 * /autor/{id}:
 *   get:
 *     summary: Lista autor por ID
 *     tags: [Autores]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do autor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do Autor referente ao ID
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Id do Autor não localizado
 */
routes.get("/autor/:id", Auth.autenticar, Auth.permissao(1), AutorController.listarAutorPorId);
/**
 * @swagger
 * /autor:
 *   post:
 *     summary: Cadastra um novo autor
 *     tags: [Autores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados do novo autor
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               biografia:
 *                 type: string
 *     responses:
 *       201:
 *         description: Autor criado com sucesso
 *       401:
 *         description: Não autorizado
 */
routes.post("/autor", Auth.autenticar, Auth.permissao(1), AutorController.cadastrarAutor);
/**
 * @swagger
 * /autor/{id}:
 *   put:
 *     summary: Atualiza um autor existente
 *     tags: [Autores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do autor
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados atualizados do autor
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               biografia:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: ID do autor não encontrado
 */
routes.put("/autor/:id", Auth.autenticar, Auth.permissao(1), AutorController.atualizarAutor);
/**
 * @swagger
 * /autor/{id}:
 *   delete:
 *     summary: Deleta um autor por ID
 *     tags: [Autores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do autor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Autor deletado com sucesso
 *       401:
 *         description: Não autorizado
 *      404:
 *         description: ID do autor não encontrado
 */
routes.delete("/autor/:id", Auth.autenticar, Auth.permissao(1), AutorController.deletarAutor);

export default routes