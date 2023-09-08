import { travelsRepository } from "../repositories/travelsRepository.js";

function create(passengerId, flightId) {
  return travelsRepository.insert(passengerId, flightId);
}

export const travelsService = { create };
