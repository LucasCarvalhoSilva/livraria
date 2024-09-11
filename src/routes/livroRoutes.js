import express from "express";
import LivroController from "../controllers/livroController.js";
import Auth from "../middlewares/permissao.js";

const routes = express.Router();

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de livros
 *       401:
 *         description: Não autorizado
 */
routes.get("/livros", Auth.autenticar, LivroController.listarLivros);
/**
 * @swagger
 * /livros/busca:
 *   get:
 *     summary: Busca livros com base em critérios
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: filtro
 *         in: query
 *         description: Critérios de busca
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do livro referente ao ID
 *       401:
 *         description: Não autorizado
 */
routes.get("/livros/busca", Auth.autenticar,  LivroController.listarLivrosPorFiltro);
/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Lista um livro por ID
 *     tags: [Livros]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do livro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Livro não encontrado
 */
routes.get("/livros/:id", Auth.autenticar,  LivroController.listarLivroPorId);
/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cadastra um novo livro
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados do novo livro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autorId:
 *                 type: string
 *               editoraId:
 *                 type: string
 *               anoPublicacao:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       401:
 *         description: Não autorizado
 */
routes.post("/livros", Auth.autenticar,  LivroController.cadastrarLivros);
/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro existente
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do livro
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados atualizados do livro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autorId:
 *                 type: string
 *               editoraId:
 *                 type: string
 *               anoPublicacao:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       401:
 *         description: Não autorizado
 */
routes.put("/livros/:id", Auth.autenticar,  LivroController.atualizarLivro);

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Deleta um livro por ID
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do livro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 *       401:
 *         description: Não autorizado
 */
routes.delete("/livros/:id", Auth.autenticar,  LivroController.deletarLivro);

export default routes