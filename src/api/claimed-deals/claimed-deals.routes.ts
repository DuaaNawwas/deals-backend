import { Router } from "express";
import claimedDealsController from "./claimed-deals.controller";
import validate from "../../middleware/validate";
import claimDealSchema from "./claimed-deals.schemas";
import { checkIfAuthenticated } from "../../middleware/check-auth";

const claimedDealsRouter = Router();

claimedDealsRouter.get(
  "/claimed-deals",
  claimedDealsController.getAllClaimedDeals
);
claimedDealsRouter.post(
  "/claim-deal",
  validate(claimDealSchema),
  claimedDealsController.claimDeal
);
claimedDealsRouter.get(
  "/claimed-deals/user",
  claimedDealsController.getClaimedDealsByUser
);

export default claimedDealsRouter;
