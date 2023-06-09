import { NextFunction, Request, Response } from "express";

const checkSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.id) {
    const currentTime = new Date().getTime();
    const sessionExpirationTime = req.session.cookie.expires;

    if (
      sessionExpirationTime &&
      currentTime > new Date(sessionExpirationTime).getTime()
    ) {
      req.session.destroy((error) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ message: "User logged out" });
      });
    }
  }

  next();
};

export default checkSession;
