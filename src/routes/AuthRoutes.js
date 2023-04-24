import { Router } from "express";
import * as AuthContoller from "../controllers/AuthController.js";

const AuthRoutes = Router();

AuthRoutes.post("/login", AuthContoller.login);

export default AuthRoutes;
