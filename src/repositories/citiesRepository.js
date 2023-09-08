import db from "../database/database.connection.js";

function insert(city) {
  return db.query(`INSERT INTO cities (name) VALUES ($1)`, [city]);
}

export const citiesRepository = { insert };
