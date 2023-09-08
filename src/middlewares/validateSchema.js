import { errorTypes } from "../errors/index.js";

export default function validateSchema(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error)
      throw errorTypes.schema(
        validation.error.details.map((detail) => detail.message)
      );
    next();
  };
}
