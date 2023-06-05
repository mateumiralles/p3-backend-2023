import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import leaguessRouter from  './leagues.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/leagues", leaguessRouter);

const { SERVER_PORT } = process.env; //desestructurando
app.listen(SERVER_PORT, () => {
  console.log(`API escuchando en el puerto ${SERVER_PORT}`);
});
