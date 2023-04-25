import { Router } from "express";
import verifyJwt from "../middlewares/verifyJwt.js";
import * as SessionController from "../controllers/SessionController.js";

const SessionRoutes = Router();

SessionRoutes.route("/")
  .post(verifyJwt, SessionController.create)
  .delete(verifyJwt, SessionController.endSession);

SessionRoutes.get("/:timezone", verifyJwt, SessionController.getActive);

export default SessionRoutes;
