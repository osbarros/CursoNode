import { Router } from "express";
import * as AuthContoller from "../controllers/AuthController.js";

const AuthRoutes = Router();

AuthRoutes.post("/login", AuthContoller.login);
AuthRoutes.post("/logout", AuthContoller.logout);

export default AuthRoutes;
