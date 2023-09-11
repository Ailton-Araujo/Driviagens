import { flightsRepository } from "../repositories/flightsRepository.js";
import dateSchema from "../schemas/dateSchema.js";
import { errorTypes } from "../errors/index.js";

function create(origin, destination, date) {
  return flightsRepository.insert(origin, destination, date);
}

function read(queryStrings) {
  const {
    origin,
    destination,
    "smaller-date": smallDate,
    "bigger-date": biggerDate,
    page,
  } = queryStrings;

  const smallDateFormat = smallDate?.split("-").reverse().join("-");
  const biggerDateFormat = biggerDate?.split("-").reverse().join("-");

  if (smallDate || biggerDate) {
    const dateValidation = dateSchema.validate(
      { smallDate, biggerDate },
      { abortEarly: false }
    );

    if (dateValidation.error)
      throw errorTypes.schema(
        dateValidation.error.details.map((detail) => detail.message)
      );

    if (new Date(smallDateFormat) > new Date(biggerDateFormat))
      throw errorTypes.query(
        "The smaller-date cannot be after the bigger-date"
      );
  }

  if (page) {
    if (isNaN(Number(page)) || Number(page) < 1)
      throw errorTypes.query("The page must be a number greater than 0");
  }

  return flightsRepository.select(
    origin,
    destination,
    smallDateFormat,
    biggerDateFormat,
    page
  );
}

export const flightsService = { create, read };
