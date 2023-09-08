import httpStatus from "http-status";
import { passengersService } from "../services/passengersService.js";

async function create(req, res) {
  const { firstName, lastName } = req.body;
  await passengersService.create(firstName, lastName);

  res.sendStatus(httpStatus.CREATED);
}
async function read(req, res) {
  const queryStrings = req.query;
  const passengersTravels = await passengersService.read(queryStrings);

  res.status(httpStatus.OK).send(passengersTravels);
}

export const passengersController = { create, read };
