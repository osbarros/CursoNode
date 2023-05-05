import { Router } from "express";
import verifyJwt from "../middlewares/verifyJwt.js";
import * as SessionController from "../controllers/SessionController.js";
import * as SessionValidator from "../validators/SessionValidator.js";
import { validateRequest } from "zod-express-middleware";
import validateIsSessionUser from "../middlewares/validateIsSessionUser.js";

const SessionRoutes = Router();

SessionRoutes.route("/")
  .post(
    verifyJwt,
    validateRequest(SessionValidator.create),
    validateIsSessionUser, // If the token user._id is equal userId in the body
    SessionController.create
  )
  .delete(
    verifyJwt,
    validateRequest(SessionValidator.endSession),
    validateIsSessionUser, // If the token user._id is equal userId in the body
    SessionController.endSession
  );

SessionRoutes.get(
  "/",
  verifyJwt,
  validateRequest(SessionValidator.getActive),
  SessionController.getActive
);

export default SessionRoutes;
