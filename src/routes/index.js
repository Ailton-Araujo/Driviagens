import { Router } from "express";
import passengersRouter from "./passengersRouter.js";
import citiesRouter from "./citiesRouter.js";
import flightsRouter from "./flightsRouter.js";
import travelsRouter from "./travelsRouter.js";

const router = Router();

router.use(passengersRouter);
router.use(citiesRouter);
router.use(flightsRouter);
router.use(travelsRouter);

export default router;
