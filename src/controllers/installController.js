import {autor, livro, editora, usuario} from "../models/index.js"
import bcrypt from 'bcrypt';

async function instalar (req, res, next) {
  try {

    const autores = await autor.insertMany([
      { nome: 'Autor 1', nacionalidade: 'Brasileiro' },
      { nome: 'Autor 2', nacionalidade: 'Americano' },
      { nome: 'Autor 3', nacionalidade: 'Inglês' },
      { nome: 'Autor 4', nacionalidade: 'Argentino' },
      { nome: 'Autor 5', nacionalidade: 'Canadense' }
    ]);

    const editoras = await editora.insertMany([
      { nome: 'Editora 1' },
      { nome: 'Editora 2' },
      { nome: 'Editora 3' },
      { nome: 'Editora 4' },
      { nome: 'Editora 5' }
    ]);

    // eslint-disable-next-line no-unused-vars
    const livros = await livro.insertMany([
      { titulo: 'Livro 1', editora: [editoras[0]._id, editoras[1]._id], preco: 50, paginas: 100, autor: [autores[0]._id] },
      { titulo: 'Livro 2', editora: [editoras[1]._id, editoras[2]._id], preco: 60, paginas: 200, autor: [autores[1]._id] },
      { titulo: 'Livro 3', editora: [editoras[2]._id, editoras[3]._id], preco: 70, paginas: 300, autor: [autores[2]._id] },
      { titulo: 'Livro 4', editora: [editoras[3]._id, editoras[4]._id], preco: 80, paginas: 400, autor: [autores[3]._id] },
      { titulo: 'Livro 5', editora: [editoras[4]._id, editoras[0]._id], preco: 90, paginas: 500, autor: [autores[4]._id] }
    ]);

    // eslint-disable-next-line no-unused-vars
    const usuarios = await usuario.insertMany([
      { nickname: 'user1', nome: 'Nome1', sobrenome: 'Sobrenome1', senha: await bcrypt.hash('senha1', 10), nivelDeAcesso: 1 },
      { nickname: 'user2', nome: 'Nome2', sobrenome: 'Sobrenome2', senha: await bcrypt.hash('senha2', 10), nivelDeAcesso: 1 },
      { nickname: 'admin1', nome: 'Admin1', sobrenome: 'Sobrenome1', senha: await bcrypt.hash('senha3', 10), nivelDeAcesso: 2 },
      { nickname: 'admin2', nome: 'Admin2', sobrenome: 'Sobrenome2', senha: await bcrypt.hash('senha4', 10), nivelDeAcesso: 2 },
      { nickname: 'user3', nome: 'Nome3', sobrenome: 'Sobrenome3', senha: await bcrypt.hash('senha5', 10), nivelDeAcesso: 1 }
    ]);

    res.status(201).json({ message: 'Dados de instalação inseridos com sucesso!' });
  } catch (error) {
    next(error);
  }
};

export default instalar;