import { Router } from "express";
import verifyJwt from "../middlewares/verifyJwt.js";
import { validateRequest } from "zod-express-middleware";
import * as UserController from "../controllers/UserController.js";
import * as UserValidator from "../validators/UserValidator.js";

const UserRoutes = Router();

UserRoutes.route("/")
  .get(verifyJwt, UserController.get)
  .post(validateRequest(UserValidator.create), UserController.create);

UserRoutes.route("/:id")
  .get(
    verifyJwt,
    validateRequest(UserValidator.getById),
    UserController.getById
  )
  .put(verifyJwt, validateRequest(UserValidator.update), UserController.update)
  .delete(
    verifyJwt,
    validateRequest(UserValidator.destroy),
    UserController.destroy
  );

export default UserRoutes;
