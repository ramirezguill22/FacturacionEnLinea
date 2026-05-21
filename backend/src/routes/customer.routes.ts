import { Router } from "express";

import { getCustomerFiscalInfoController } from "../controllers/customer.controller";

const customerRouter = Router();

customerRouter.post("/datos-fiscales", getCustomerFiscalInfoController);

export { customerRouter };