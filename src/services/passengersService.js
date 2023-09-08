import { passengersRepository } from "../repositories/passengerRepository.js";
import { errorTypes } from "../errors/index.js";

function create(firstName, lastName) {
  return passengersRepository.insert(firstName, lastName);
}

async function read(queryStrings) {
  const { name, page } = queryStrings;

  let sqlQuery = ` `;
  const sqlQueryParams = [];

  if (name) {
    sqlQueryParams.push(`%${name}%`);
    sqlQuery += `WHERE passengers."firstName" ILIKE $${sqlQueryParams.length} 
    OR passengers."lastName" ILIKE $${sqlQueryParams.length} `;
  }

  sqlQuery += `GROUP BY passengers.id
  ORDER BY travels DESC, passengers.id `;

  if (page) {
    if (isNaN(Number(page)) || Number(page) < 1)
      throw errorTypes.query("The page must be a number greater than 0");
    sqlQueryParams.push((page - 1) * 10);
    sqlQuery += `OFFSET $${sqlQueryParams.length} `;
  }
  const passengerTravels = await passengersRepository.select(
    sqlQuery,
    sqlQueryParams
  );

  if (passengerTravels.rows.length > 10)
    throw errorTypes.internal("Too many results");

  return passengerTravels.rows;
}

export const passengersService = { create, read };
