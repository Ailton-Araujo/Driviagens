import joiBase from "joi";
import joiDate from "@joi/date";
const joi = joiBase.extend(joiDate);

const dateSchema = joi.object({
  smallDate: joi.date().format("DD-MM-YYYY").required(),
  biggerDate: joi.date().format("DD-MM-YYYY").required(),
});

export default dateSchema;
