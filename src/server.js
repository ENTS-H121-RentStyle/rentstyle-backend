import express, { json } from "express";
import { config } from 'dotenv';
import productRouter from "./routes/product_route.js";

config();
const app = express();
const port = process.env.PORT;

app.use(json());

app.get("/", (req, res) => {
  res.send("Rentstyle Backend");
});

// Menggunakan router untuk rute "/test"
app.use("/", productRouter);

// Menjalankan server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
