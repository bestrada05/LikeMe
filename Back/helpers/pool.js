import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "focuspocus",
  database: "likeme",
  allowExitOnIdle: true,
});
s;
export { pool };
