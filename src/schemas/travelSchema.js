import Joi from "joi";

export const travelSchema = Joi.object({
  passengerId: Joi.number().integer().positive().allow(0).required(),
  flightId: Joi.number().integer().positive().allow(0).required(),
});
