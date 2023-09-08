import db from "../database/database.connection.js";

function insert(origin, destination, date) {
  return db.query(
    `INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3)`,
    [origin, destination, date.split("-").reverse().join("-")]
  );
}

function select(sqlQuery, sqlQueryParams) {
  return db.query(
    `SELECT flights.id, 
    "originTb".name AS origin,
    "destinationTb".name AS destination,
    TO_CHAR(date, 'DD-MM-YYYY') AS date 
    FROM flights
    JOIN cities AS "originTb" ON flights.origin = "originTb".id
    JOIN cities AS "destinationTb" ON flights.destination = "destinationTb".id
    ${sqlQuery}
    LIMIT 10;`,
    sqlQueryParams
  );
}

export const flightsRepository = { insert, select };
