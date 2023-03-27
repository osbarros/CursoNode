import { Router } from "express";
import AuthRoutes from "./AuthRoutes.js";
import SessionRoutes from "./SessionRoute.js";
import UserRoutes from "./UserRoutes.js";

const routes = Router();

routes
  .use("/", AuthRoutes)
  .use("/users", UserRoutes)
  .use("/sessions", SessionRoutes);

export default routes;
