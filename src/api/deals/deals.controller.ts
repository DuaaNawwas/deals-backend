import { Request, Response } from "express";
import Deal from "../../models/deal.model";
import moment from "moment-timezone";
import getServerTime from "../../helpers/server-time";
import { Op } from "sequelize";
import { CustomSessionData } from "../users/users.controllers";
import ClaimedDeal from "../../models/claimed-deal.model";

export default {
  getAllDeals: async function (req: Request, res: Response) {
    try {
      const user = (req.session as CustomSessionData).user;
      const deals = await Deal.findAll({
        where: { Status: { [Op.ne]: "Deleted" } },
        include: [
          {
            model: ClaimedDeal,
            where: { User_ID: user?.id },
            required: false,
          },
        ],
      });

      const dealsWithClaimedStatus = deals.map((deal) => {
        return {
          ...deal.toJSON(),
          Claimed: deal.claimedDeals,
        };
      });

      res.status(200).json(dealsWithClaimedStatus);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllDealsDashboard: async function (req: Request, res: Response) {
    try {
      const deals = await Deal.findAll({});

      res.status(200).json(deals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createDeal: async function (req: Request, res: Response): Promise<Response> {
    try {
      const time = getServerTime();
      req.body.Server_DateTime = time;

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

  softDeleteMultipleDeals: async function (req: Request, res: Response) {
    try {
      const { ids } = req.body;
      await Deal.update({ Status: "Deleted" }, { where: { id: ids } });
      return res.status(200).json({ message: "Deals deleted" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },
};
