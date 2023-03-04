const app = require("./app");
const Loaders = require("./loaders/index");

Loaders.start();

app.listen(4444, () => console.log("Servidor Rodando"));