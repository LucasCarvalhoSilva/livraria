import express from "express";
import LoginController from "../controllers/loginController.js";

const routes = express.Router();

routes.post('/login', LoginController.login)

export default routes