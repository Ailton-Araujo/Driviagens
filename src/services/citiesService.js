import { citiesRepository } from "../repositories/citiesRepository.js";

function create(city) {
  return citiesRepository.insert(city);
}
export const citiesService = { create };
