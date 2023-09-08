import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { passengerSchema } from "../schemas/passengerSchema.js";
import { passengersController } from "../controller/passengersController.js";

const passengersRouter = Router();

passengersRouter.post(
  "/passengers",
  validateSchema(passengerSchema),
  passengersController.create
);

passengersRouter.get("/passengers/travels", passengersController.read);

export default passengersRouter;
