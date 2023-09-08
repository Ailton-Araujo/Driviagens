import db from "../database/database.connection.js";

function insert(passengerId, flightId) {
  return db.query(
    `INSERT INTO travels ("passengerId","flightId") VALUES ($1, $2)`,
    [passengerId, flightId]
  );
}

export const travelsRepository = { insert };
