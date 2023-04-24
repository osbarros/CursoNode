import { Router } from "express";
import verifyJwt from "../middlewares/verifyJwt.js";
import * as SessionController from "../controllers/SessionController.js";

const SessionRoutes = Router();

SessionRoutes.route("/")
  .get(verifyJwt, SessionController.get)
  .post(verifyJwt, SessionController.create);

SessionRoutes.route("/:id")
  .get(verifyJwt, SessionController.getById)
  .put(verifyJwt, SessionController.update)
  .delete(verifyJwt, SessionController.destroy);

SessionRoutes.route("/user/:userId")
  .get(verifyJwt, SessionController.getByUserId)
  .post(verifyJwt, SessionController.endSession);

SessionRoutes.route("/user/:userId/total-hours").get(
  verifyJwt,
  SessionController.getAllSessionsTotalTime
);

export default SessionRoutes;
