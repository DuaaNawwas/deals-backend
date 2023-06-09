import { Request, Response } from "express";
import ClaimedDeal from "../../models/claimed-deal.model";
import getServerTime from "../../helpers/server-time";
import Deal from "../../models/deal.model";

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
      const { Deal_ID, User_ID } = req.body;

      const dealToClaim = await Deal.findOne({
        where: { id: Deal_ID },
      });
      if (!dealToClaim) {
        return res.status(400).json({ error: "Deal not found" });
      }
      if (dealToClaim.Status !== "Active") {
        return res.status(400).json({ error: "Deal is not active" });
      }

      const claimedDeal = await ClaimedDeal.findOne({
        where: { User_ID: User_ID, Deal_ID: Deal_ID },
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
        Amount: dealToClaim.Amount,
        Currency: dealToClaim.Currency,
      });
      return res.status(200).json(newClaimedDeal);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  getClaimedDealsByUser: async (req: Request, res: Response) => {
    try {
      const { User_ID } = req.params || req.body;

      const claimedDeals: ClaimedDeal[] = await ClaimedDeal.findAll({
        where: { User_ID: User_ID },
      });
      res.status(200).json(claimedDeals);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};
