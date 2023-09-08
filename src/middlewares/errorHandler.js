import httpStatus from "http-status";

export default function errorHandler(error, req, res, next) {
  console.error(error);
  switch (error.type || error.code) {
    case "query":
      return res.status(httpStatus.BAD_REQUEST).send(error.detail);
    case ("notFound", "23503"):
      return res.status(httpStatus.NOT_FOUND).send(error.detail);
    case ("conflict", "23505"):
      return res.status(httpStatus.CONFLICT).send(error.detail);
    case "schema":
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.detail);
    default:
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send("Try again later");
  }
}
