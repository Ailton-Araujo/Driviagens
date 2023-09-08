import httpStatus from "http-status";
import { flightsService } from "../services/flightsService.js";
import { errorTypes } from "../errors/index.js";

async function create(req, res) {
  const { origin, destination, date } = req.body;
  if (origin === destination)
    throw errorTypes.conflict("Origin must be different than Destination");

  await flightsService.create(origin, destination, date);
  res.sendStatus(httpStatus.CREATED);
}

async function read(req, res) {
  const queryStrings = req.query;
  const flights = await flightsService.read(queryStrings);

  res.status(httpStatus.OK).send(flights);
}

export const flightsController = { create, read };
