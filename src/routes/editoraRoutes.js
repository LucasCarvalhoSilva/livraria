import express from "express";
import EditoraController from "../controllers/editoraController.js";
import Auth from "../middlewares/permissao.js";

const routes = express.Router();

/**
 * @swagger
 * /editora:
 *   get:
 *     summary: Lista todas as editoras
 *     tags: [Editoras]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de editoras
 *       401:
 *         description: Não autorizado
 */
routes.get("/editora", Auth.autenticar, Auth.permissao(1), EditoraController.listarEditora);
/**
 * @swagger
 * /editora/{id}:
 *   get:
 *     summary: Lista uma editora por ID
 *     tags: [Editoras]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da editora
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados da editora referente ao ID
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Id da Editora não localizado
 */
routes.get("/editora/:id", Auth.autenticar, Auth.permissao(1), EditoraController.listarEditoraPorId);
/**
 * @swagger
 * /editora:
 *   post:
 *     summary: Cadastra uma nova editora
 *     tags: [Editoras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados da nova editora
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               endereco:
 *                 type: string
 *     responses:
 *       201:
 *         description: Editora criada com sucesso
 *       401:
 *         description: Não autorizado
 */
routes.post("/editora", Auth.autenticar, Auth.permissao(1), EditoraController.cadastrarEditora);
/**
 * @swagger
 * /editora/{id}:
 *   put:
 *     summary: Atualiza uma editora existente
 *     tags: [Editoras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da editora
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados atualizados da editora
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               endereco:
 *                 type: string
 *     responses:
 *       200:
 *         description: Editora atualizada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Id da Editora não localizado
 */
routes.put("/editora/:id", Auth.autenticar, Auth.permissao(1), EditoraController.atualizarEditora);
/**
 * @swagger
 * /editora/{id}:
 *   delete:
 *     summary: Deleta uma editora por ID
 *     tags: [Editoras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da editora
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Editora deletada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Id da Editora não localizado
 */
routes.delete("/editora/:id", Auth.autenticar, Auth.permissao(1), EditoraController.deletarEditora);

export default routes