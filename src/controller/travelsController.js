import httpStatus from "http-status";
import { travelsService } from "../services/travelsService.js";

async function create(req, res) {
  const { passengerId, flightId } = req.body;
  await travelsService.create(passengerId, flightId);

  res.sendStatus(httpStatus.CREATED);
}

export const travelsController = { create };
