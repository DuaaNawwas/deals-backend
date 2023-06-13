import { Router } from "express";

import dealsController from "./deals.controller";
import validate from "../../middleware/validate";
import { createDealSchema, updateDealSchema } from "./deals.schemas";
import {
  checkIfAdmin,
  checkIfAuthenticated,
} from "../../middleware/check-auth";

const dealsRouter = Router();

dealsRouter.get("/deals", dealsController.getAllDeals);
dealsRouter.get("/deals/dashboard",checkIfAdmin, dealsController.getAllDealsDashboard);
dealsRouter.post(
  "/deal",
  checkIfAdmin,
  validate(createDealSchema),
  dealsController.createDeal
);
dealsRouter.put(
  "/deal",
  checkIfAdmin,
  validate(updateDealSchema),
  dealsController.updateDeal
);
dealsRouter.delete("/deal", checkIfAdmin, dealsController.softDeleteDeal);
dealsRouter.delete("/deals", checkIfAdmin, dealsController.softDeleteMultipleDeals);


export default dealsRouter;
