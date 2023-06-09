import express, { Application, Request, Response } from "express";
import dealsRouter from "./api/deals";
import "reflect-metadata";

import dotenv from "dotenv";
dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", dealsRouter);

export default app;
