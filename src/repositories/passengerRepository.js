import db from "../database/database.connection.js";

function insert(firstName, lastName) {
  return db.query(
    `INSERT INTO passengers ("firstName","lastName") VALUES ($1, $2)`,
    [firstName, lastName]
  );
}

function select(sqlQuery, sqlQueryParams) {
  return db.query(
    `SELECT (passengers."firstName" || ' ' || passengers."lastName") AS passenger, 
    CAST(COUNT(travels."passengerId") AS INTEGER) AS travels
    FROM passengers
    JOIN travels ON passengers.id = travels."passengerId"
    ${sqlQuery}
    LIMIT 10;`,
    sqlQueryParams
  );
}

export const passengersRepository = { insert, select };
