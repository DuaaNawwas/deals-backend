import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      const parsed = schema.safeParse(req.body);

      if (!parsed.success) {
        res.status(400).json({ message: parsed.error.issues[0].path + " : " + parsed.error.issues[0].message });
        return;
      }

      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

export default validate;
