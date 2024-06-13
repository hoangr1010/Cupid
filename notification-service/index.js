import dotenv from "dotenv";
dotenv.config();
import createApp from "./app.js";
import db from "./utils/connectDB.js";

const app = createApp();

app.listen(process.env.PORT, () => {
  console.log(`Server running at localhost ${process.env.PORT}`);
});

export default app;