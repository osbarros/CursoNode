import "dotenv/config";
import app from "./app.js";
import mongoConfig from "./config/mongo.js";

const PORT = process.env.PORT || 3333;

app.listen(PORT, async () => {
  try {
    await mongoConfig();
    console.log(`Server started at http://localhost:${PORT}`);
  } catch (error) {
    console.log("Failed to connect with MongoDB");
    process.exit(1);
  }
});
