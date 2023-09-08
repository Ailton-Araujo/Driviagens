import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { travelSchema } from "../schemas/travelSchema.js";
import { travelsController } from "../controller/travelsController.js";

const travelsRouter = Router();

travelsRouter.post(
  "/travels",
  validateSchema(travelSchema),
  travelsController.create
);

export default travelsRouter;
