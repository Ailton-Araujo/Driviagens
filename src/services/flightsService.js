import joiBase from "joi";
import joiDate from "@joi/date";
const joi = joiBase.extend(joiDate);

import { flightsRepository } from "../repositories/flightsRepository.js";
import { errorTypes } from "../errors/index.js";

function create(origin, destination, date) {
  return flightsRepository.insert(origin, destination, date);
}

async function read(queryStrings) {
  const {
    origin,
    destination,
    "smaller-date": smallDate,
    "bigger-date": biggerDate,
    page,
  } = queryStrings;

  let sqlQuery = ` `;
  const sqlQueryParams = [];

  if (origin) {
    sqlQueryParams.push(origin);
    sqlQuery += `WHERE LOWER("originTb".name) = LOWER($${sqlQueryParams.length}) `;
  }

  if (destination) {
    sqlQueryParams.push(destination);
    sqlQuery += sqlQuery.includes("WHERE") ? `AND ` : `WHERE `;
    sqlQuery += `LOWER ("destinationTb".name) = LOWER($${sqlQueryParams.length}) `;
  }

  if (smallDate || biggerDate) {
    const dateValidation = joi
      .object({
        smallDate: joi.date().format("DD-MM-YYYY").required(),
        biggerDate: joi.date().format("DD-MM-YYYY").required(),
      })
      .validate({ smallDate, biggerDate }, { abortEarly: false });

    if (dateValidation.error)
      throw errorTypes.schema(
        dateValidation.error.details.map((detail) => detail.message)
      );

    const smallDateFormat = smallDate.split("-").reverse().join("-");
    const biggerDateFormat = biggerDate.split("-").reverse().join("-");

    if (new Date(smallDateFormat) > new Date(biggerDateFormat))
      throw errorTypes.query(
        "The smaller-date cannot be after the bigger-date"
      );

    sqlQueryParams.push(smallDateFormat);
    sqlQueryParams.push(biggerDateFormat);
    sqlQuery += sqlQuery.includes("WHERE") ? `AND ` : `WHERE `;
    sqlQuery += `flights.date BETWEEN $${sqlQueryParams.length - 1} AND $${
      sqlQueryParams.length
    } `;
  }

  sqlQuery += `ORDER BY flights.date, flights.id `;

  if (page) {
    if (isNaN(Number(page)) || Number(page) < 1)
      throw errorTypes.query("The page must be a number greater than 0");
    sqlQueryParams.push((page - 1) * 10);
    sqlQuery += `OFFSET $${sqlQueryParams.length} `;
  }

  const flights = await flightsRepository.select(sqlQuery, sqlQueryParams);

  if (flights.rows.length > 10) throw errorTypes.internal("Too many results");

  return flights.rows;
}

export const flightsService = { create, read };
