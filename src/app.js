import express from "express";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true })); // Default config
app.use(express.json()); // Default config
app.use(cors());
app.use(routes);
app.use("*", (req, res) =>
  res.status(404).json({ message: `Route '${req.baseUrl}' not found.` })
);

export default app;
