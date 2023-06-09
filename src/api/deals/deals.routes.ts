import { Router } from "express";

import dealsController from "./deals.controller";
import validate from "../../middleware/validate";
import { createDealSchema, updateDealSchema } from "./deals.schemas";

const dealsRouter = Router();

dealsRouter.get("/deals",  dealsController.getAllDeals);
dealsRouter.post("/deal", validate(createDealSchema) , dealsController.createDeal);
dealsRouter.put("/deal", validate(updateDealSchema) ,  dealsController.updateDeal);
dealsRouter.delete("/deal",  dealsController.softDeleteDeal);

export default dealsRouter;