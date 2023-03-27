import { Router } from "express";
import * as SessionController from "../controllers/SessionController.js";

const SessionRoutes = Router();

SessionRoutes.route("/")
  .get(SessionController.get)
  .post(SessionController.create);

SessionRoutes.route("/:id")
  .get(SessionController.getById)
  .put(SessionController.update)
  .delete(SessionController.destroy);

SessionRoutes.route("/user/:userId")
  .get(SessionController.getByUserId)
  .post(SessionController.endSession);

export default SessionRoutes;
