// const express = require("express");
// const rotas = require("./routes");
import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: true })); // Default config
app.use(express.json()); // Default config
app.use(routes);

export default app;
