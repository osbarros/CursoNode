import { Router } from "express";
import verifyJwt from "../middlewares/verifyJwt.js";
import * as UserController from "../controllers/UserController.js";

const UserRoutes = Router();

UserRoutes.route("/")
  .get(verifyJwt, UserController.get)
  .post(UserController.create);

UserRoutes.route("/:id")
  .get(verifyJwt, UserController.getById)
  .put(verifyJwt, UserController.update)
  .delete(verifyJwt, UserController.destroy);

export default UserRoutes;
