import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req: Request, res: Response): void => {
  res.send("Hello world!");
});

export default app;
