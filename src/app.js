import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";
import { swaggerUi, swaggerSpec } from './swagger.js';

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
  console.error('erro de conexão', erro);
})

conexao.once("open", () => {
  console.log("conexao com o banco feita com sucesso");
})

const app = express();
routes(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(manipulador404);

app.use(manipuladorDeErros);

export default app;


