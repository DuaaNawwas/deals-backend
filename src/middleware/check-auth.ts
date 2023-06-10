import { NextFunction, Request, Response } from "express";
import { CustomSessionData } from "../api/users/users.controllers";

const checkIfAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && (req.session as CustomSessionData).user) {
    return next();
  } else {
    return res.status(401).json("unauthorized");
  }
};

const checkIfAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && (req.session as CustomSessionData).user) {
    if ((req.session as CustomSessionData).user?.Role === "admin") {
      return next();
    } else {
      return res.status(401).json("unauthorized");
    }
  } else {
    return res.status(401).json("unauthorized");
  }
};

export { checkIfAuthenticated, checkIfAdmin };
