import db from "../database/database.connection.js";

function insert(firstName, lastName) {
  return db.query(
    `INSERT INTO passengers ("firstName","lastName") VALUES ($1, $2)`,
    [firstName, lastName]
  );
}

function select(name, page) {
  const sqlQueryParams = [];
  let sqlQuery = `SELECT (passengers."firstName" || ' ' || passengers."lastName") AS passenger, 
  CAST(COUNT(travels."passengerId") AS INTEGER) AS travels
  FROM passengers
  LEFT JOIN travels ON passengers.id = travels."passengerId" `;

  if (name) {
    sqlQueryParams.push(`%${name}%`);
    sqlQuery += `WHERE passengers."firstName" ILIKE $${sqlQueryParams.length} 
    OR passengers."lastName" ILIKE $${sqlQueryParams.length} `;
  }

  sqlQuery += `GROUP BY passengers.id
  ORDER BY travels DESC, passengers.id `;

  if (page) {
    sqlQueryParams.push((page - 1) * 10);
    sqlQuery += `OFFSET $${sqlQueryParams.length} 
    LIMIT 10;`;
  }

  return db.query(sqlQuery, sqlQueryParams);
}

export const passengersRepository = { insert, select };
