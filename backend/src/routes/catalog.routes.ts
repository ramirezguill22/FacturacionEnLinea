import { Router } from "express";

import { getUsoCfdiCatalogController } from "../controllers/catalog.controller";

const catalogRouter = Router();

catalogRouter.get("/usos-cfdi", getUsoCfdiCatalogController);

export { catalogRouter };