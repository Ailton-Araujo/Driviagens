import { passengersRepository } from "../repositories/passengerRepository.js";
import { errorTypes } from "../errors/index.js";

function create(firstName, lastName) {
  return passengersRepository.insert(firstName, lastName);
}

async function read(queryStrings) {
  const { name, page } = queryStrings;

  if (page) {
    if (isNaN(Number(page)) || Number(page) < 1)
      throw errorTypes.query("The page must be a number greater than 0");
  }
  const passengerTravels = await passengersRepository.select(name, page);

  if (passengerTravels.rows.length > 10)
    throw errorTypes.internal("Too many results");

  return passengerTravels.rows;
}

export const passengersService = { create, read };
