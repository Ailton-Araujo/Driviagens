import httpStatus from "http-status";
import { citiesService } from "../services/citiesService.js";

async function create(req, res) {
  const { name } = req.body;

  await citiesService.create(name);
  res.sendStatus(httpStatus.CREATED);
}

export const citiesController = { create };
