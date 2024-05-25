import express, { json } from "express";
import { config } from "dotenv";
// import cors from "cors";
import routerApi from "./routes/index.js";

config();
const app = express();
const port = process.env.PORT;

// app.use(cors);
app.use(json());

app.get("/", (req, res) => {
  res.send("Rentstyle Backend");
});

routerApi(app);

// Menjalankan server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
