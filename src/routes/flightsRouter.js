import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { flightSchema } from "../schemas/flightSchema.js";
import { flightsController } from "../controller/flightsController.js";

const flightsRouter = Router();

flightsRouter.post(
  "/flights",
  validateSchema(flightSchema),
  flightsController.create
);

flightsRouter.get("/flights", flightsController.read);

export default flightsRouter;
