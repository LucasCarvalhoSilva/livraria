import express from "express";
import livros from "./livroRoutes.js";
import autor from "./autorRoutes.js";
import editora from "./editoraRoutes.js";
import usuario from "./userRoutes.js";
import login from "./loginRoutes.js";
import install from "./installRoutes.js";

/**
 * @openapi
 * /livros:
 *   get:
 *     summary: Listar todos os livros
 *     description: Retorna uma lista de todos os livros com detalhes de autores e editoras.
 *     responses:
 *       200:
 *         description: Lista de livros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do livro
 *                   titulo:
 *                     type: string
 *                     description: Título do livro
 *                   preco:
 *                     type: number
 *                     description: Preço do livro
 *                   paginas:
 *                     type: number
 *                     description: Número de páginas do livro
 *                   autores:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: ID do autor
 *                   editoras:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: ID da editora
 */
const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send("Curso de Node.js"));
 
  app.use(express.json(), livros, autor, editora, usuario, login, install );
};

export default routes;