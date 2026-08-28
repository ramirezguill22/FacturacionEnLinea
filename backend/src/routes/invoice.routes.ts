import { Router } from "express";

import { generateInvoiceController } from "../controllers/invoice.controller";

const invoiceRouter = Router();

invoiceRouter.post("/generar", generateInvoiceController);

export { invoiceRouter };