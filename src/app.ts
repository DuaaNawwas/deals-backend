import express, { Application, Request, Response } from "express";
import dealsRouter from "./api/deals";
import dotenv from "dotenv";
dotenv.config();
import claimedDealsRouter from "./api/claimed-deals";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import checkSession from "./middleware/check-session";
import userRouter from "./api/users/users.routes";
import { checkIfAuthenticated } from "./middleware/check-auth";
const app: Application = express();

const corsOptions = {
  optionsSuccessStatus: 200,
  credentials: true,
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 15 * 60 * 1000 }, // Set the session cookie's maxAge to 15 minutes
  })
);

app.use(checkSession);

app.use("/api", userRouter);

app.use(checkIfAuthenticated);

app.use("/api", dealsRouter);
app.use("/api", claimedDealsRouter);

export default app;
