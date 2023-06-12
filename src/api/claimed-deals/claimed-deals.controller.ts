import { Request, Response } from "express";
import ClaimedDeal from "../../models/claimed-deal.model";
import getServerTime from "../../helpers/server-time";
import Deal from "../../models/deal.model";
import { CustomSessionData } from "../users/users.controllers";

export default {
  getAllClaimedDeals: async (req: Request, res: Response) => {
    try {
      const claimedDeals: ClaimedDeal[] = await ClaimedDeal.findAll();
      res.status(200).json(claimedDeals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  claimDeal: async (req: Request, res: Response) => {
    try {
        const user = (req.session as CustomSessionData).user
        
      const { Deal_ID } = req.body;

      const dealToClaim = await Deal.findOne({
        where: { id: Deal_ID },
      });
      
      if (!dealToClaim) {
        return res.status(400).json({ error: "Deal not found" });
      }
      if (dealToClaim.dataValues.Status !== "Active") {
        return res.status(400).json({ error: "Deal is not active" });
      }

      const claimedDeal = await ClaimedDeal.findOne({
        where: { User_ID: user!.id, Deal_ID: Deal_ID },
      });
      if (claimedDeal) {
        return res
          .status(400)
          .json({ error: "You have already claimed this deal" });
      }

      const Server_DateTime = getServerTime();
      req.body.Server_DateTime = Server_DateTime;

      const newClaimedDeal: ClaimedDeal = await ClaimedDeal.create({
        ...req.body,
        Amount: dealToClaim.dataValues.Amount,
        Currency: dealToClaim.dataValues.Currency,
        User_ID: user!.id,
      });
      return res.status(200).json(newClaimedDeal);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  getClaimedDealsByUser: async (req: Request, res: Response) => {
    try {
        const user = (req.session as CustomSessionData).user

      const claimedDeals: ClaimedDeal[] = await ClaimedDeal.findAll({
        where: { User_ID: user!.id },
      });
      res.status(200).json(claimedDeals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};
