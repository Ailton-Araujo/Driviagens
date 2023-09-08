import { query } from "./query.js";
import { notFound } from "./notFound.js";
import { schema } from "./schema.js";
import { conflict } from "./conflict.js";
import { internal } from "./internal.js";

export const errorTypes = { query, notFound, conflict, schema, internal };
