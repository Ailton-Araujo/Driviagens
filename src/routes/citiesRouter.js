import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { citySchema } from "../schemas/citySchema.js";
import { citiesController } from "../controller/citiesController.js";

const citiesRouter = Router();

citiesRouter.post(
  "/cities",
  validateSchema(citySchema),
  citiesController.create
);

export default citiesRouter;
