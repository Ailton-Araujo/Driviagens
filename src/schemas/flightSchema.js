import joiBase from "joi";
import joiDate from "@joi/date";

const joi = joiBase.extend(joiDate);

export const flightSchema = joi.object({
  origin: joi.number().integer().positive().allow(0).required(),
  destination: joi.number().integer().positive().allow(0).required(),
  date: joi.date().format("DD-MM-YYYY").greater("now").required(),
});
