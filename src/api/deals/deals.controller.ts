import { Request, Response } from "express";
import Deal from "../../models/deal.model";
import moment from "moment-timezone";

export default {
  getAllDeals: async function (req: Request, res: Response) {
    try {
      const deals = await Deal.findAll({
        where: { Status: { $ne: "Deleted" } },
      });
      res.status(200).json(deals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createDeal: async function (req: Request, res: Response): Promise<Response> {
    try {
      // Get the current timezone
      const currentTz = moment.tz.guess();
      console.log(currentTz);

      // Get the current time in the detected timezone
      const time = moment.tz(currentTz).toDate();
      console.log(time);
      req.body.Server_DateTime = time;
      console.log(req.body);

      const newDeal: Deal = await Deal.create({ ...req.body });
      return res.status(201).json(newDeal);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateDeal: async function (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;
      const [updated] = await Deal.update(req.body, {
        where: { id: id },
      });
      console.log(updated);

      if (updated) {
        const updatedDeal = await Deal.findOne({ where: { id: id } });
        return res.status(200).json(updatedDeal);
      }
      throw new Error("Deal not found");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  softDeleteDeal: async function (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.body;
      const [deleted] = await Deal.update(
        {
          Status: "Deleted",
        },
        {
          where: { id: id },
        }
      );

      if (deleted) {
        return res.status(200).json({ message: "Deal deleted" });
      }
      throw new Error("Deal not found");
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
};
