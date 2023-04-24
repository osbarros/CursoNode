import express from "express";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true })); // Default config
app.use(express.json()); // Default config
app.use(cors());
app.use(routes);

export default app;
