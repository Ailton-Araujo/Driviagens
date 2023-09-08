import { passengersRepository } from "../repositories/passengerRepository.js";

function create(firstName, lastName) {
  return passengersRepository.insert(firstName, lastName);
}

function read(queryStrings) {
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
  return passengersRepository.select(sqlQuery, sqlQueryParams);
}

export const passengersService = { create, read };
