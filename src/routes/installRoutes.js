import express from "express";
import instalar from "../controllers/installController.js";

const routes = express.Router();

routes.post('/install', instalar)

export default routes