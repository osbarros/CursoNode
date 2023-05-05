import { Router } from "express";
import * as AuthContoller from "../controllers/AuthController.js";
import * as AuthValidator from "../validators/AuthValidator.js";
import { validateRequest } from "zod-express-middleware";

const AuthRoutes = Router();

AuthRoutes.post(
  "/login",
  validateRequest(AuthValidator.login),
  AuthContoller.login
);

export default AuthRoutes;
