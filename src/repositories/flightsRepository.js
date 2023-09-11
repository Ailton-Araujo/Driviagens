import db from "../database/database.connection.js";

function insert(origin, destination, date) {
  return db.query(
    `INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3)`,
    [origin, destination, date.split("-").reverse().join("-")]
  );
}

function select(origin, destination, smallDateFormat, biggerDateFormat, page) {
  const sqlQueryParams = [];
  let sqlQuery = `SELECT flights.id, 
  "originTb".name AS origin,
  "destinationTb".name AS destination,
  TO_CHAR(date, 'DD-MM-YYYY') AS date 
  FROM flights
  JOIN cities AS "originTb" ON flights.origin = "originTb".id
  JOIN cities AS "destinationTb" ON flights.destination = "destinationTb".id `;

  if (origin) {
    sqlQueryParams.push(origin);
    sqlQuery += `WHERE LOWER("originTb".name) = LOWER($${sqlQueryParams.length}) `;
  }

  if (destination) {
    sqlQueryParams.push(destination);
    sqlQuery += sqlQuery.includes("WHERE") ? `AND ` : `WHERE `;
    sqlQuery += `LOWER ("destinationTb".name) = LOWER($${sqlQueryParams.length}) `;
  }

  if (smallDateFormat && biggerDateFormat) {
    sqlQueryParams.push(smallDateFormat, biggerDateFormat);
    sqlQuery += sqlQuery.includes("WHERE") ? `AND ` : `WHERE `;
    sqlQuery += `flights.date BETWEEN $${sqlQueryParams.length - 1} AND $${
      sqlQueryParams.length
    } `;
  }

  sqlQuery += `ORDER BY flights.date, flights.id `;

  if (page) {
    sqlQueryParams.push((page - 1) * 10);
    sqlQuery += `OFFSET $${sqlQueryParams.length} 
    LIMIT 10;`;
  }

  return db.query(sqlQuery, sqlQueryParams);
}

export const flightsRepository = { insert, select };
