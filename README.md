## API para gerenciamento de livros

Desenvolvido em Node , utilizando o framework express. 
Banco de dados: mongo
Projeto utiliza variaveis de ambiente.

### Requisitos 
- Node v18.16.0
- npm ou outro gerenciador de pacotes

### Instalação
Para instalar o projeto execute o comando ```npm i``` ou o comando similar do seu gerenciador de pacotes

### Execução
Para rodar o projeto localmente, utilize o comando ```npm run dev``` ou o comando similar do seu gerenciador de pacotes

### Rotas do projeto
#### Para gestão de autores
- get("/autor", Auth.autenticar, Auth.permissao(1), AutorController.listarAutor);
- get("/autor/:id", Auth.autenticar, Auth.permissao(1), AutorController.listarAutorPorId);
- post("/autor", Auth.autenticar, Auth.permissao(1), AutorController.cadastrarAutor);
- put("/autor/:id", Auth.autenticar, Auth.permissao(1), AutorController.atualizarAutor);
- delete("/autor/:id", Auth.autenticar, Auth.permissao(1), AutorController.deletarAutor);

#### Para gestão de livros
- get("/livros", Auth.autenticar, LivroController.listarLivros);
- get("/livros/busca", Auth.autenticar,  LivroController.listarLivrosPorFiltro);
- get("/livros/:id", Auth.autenticar,  LivroController.listarLivroPorId);
- post("/livros", Auth.autenticar,  LivroController.cadastrarLivros);
- put("/livros/:id", Auth.autenticar,  LivroController.atualizarLivro);
- delete("/livros/:id", Auth.autenticar,  LivroController.deletarLivro);

#### Para gestão de editoras
- get("/editora", Auth.autenticar, Auth.permissao(1), EditoraController.listarEditora);
- get("/editora/:id", Auth.autenticar, Auth.permissao(1), EditoraController.listarEditoraPorId);
- post("/editora", Auth.autenticar, Auth.permissao(1), EditoraController.cadastrarEditora);
- put("/editora/:id", Auth.autenticar, Auth.permissao(1), EditoraController.atualizarEditora);
- delete("/editora/:id", Auth.autenticar, Auth.permissao(1), EditoraController.deletarEditora);

#### Para gestão de usuarios
- get("/usuario",Auth.autenticar, Auth.permissao(1), UserController.listarUsuarios);
- get("/usuario/:id", Auth.autenticar, Auth.permissao(1), UserController.buscarUsuarioPorId);
- post("/usuario", Auth.autenticar, Auth.permissao(1), UserController.criarUsuario);
- put("/usuario/:id", Auth.autenticar, Auth.permissao(1), UserController.atualizarUsuario);
- delete("/usuario/:id", Auth.autenticar, Auth.permissao(2), UserController.deletarUsuario);

#### Para login
- post('/login', LoginController.login)

#### Para instalação do sistema
- post('/install', instalar)


## Estruturas da aplicação
### Autor
```
autor{
  id: { type: ObjectId } ,
  nome: {
    type: String,
    required: true
  },
  nacionalidade: {
    type: String
  }
}
```

### Editora
```
editora{
  id: { type: ObjectId } ,
  nome: {
    type: String,
    required: true
  }
}
```

### Livro
```
livro{
  id: { type: ObjectId } ,
  titulo: { 
    type: String, 
    required: true
  },
  editora: [{ 
    type: ObjectId
    ref: "editoras",
    required: true
  }],
  preco: { type: Number },
  paginas: { 
    type: Number,
    min: 10,
    max: 5000
  },
  autor: [{ 
    type: ObjectId,
    ref: "autores",
    required: true
  }],
  createdBy: {
    type: ObjectId,
    ref: "usuario"
  }
}
```

### Usuários
```
usuario{
  id: { type:ObjectId },
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  nome: {
    type: String,
    required: true
  },
  sobrenome: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  nivelDeAcesso: {
    type: Number,
    required: true,
    enum: [1, 2]  //  1 = usuário comum 2 = admin
  }
}


```
