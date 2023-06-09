import Deal from "../../models/deal.model";

export default {
    checkIfDealActive: async (Deal_ID:number) => {
        const dealToClaim = await Deal.findOne({
            where: { id: Deal_ID },
          });
          if (!dealToClaim) {
            return res.status(400).json({ error: "Deal not found" });
          }
          if (dealToClaim.Status !== "Active") {
            return res.status(400).json({ error: "Deal is not active" });
          }
    }
}