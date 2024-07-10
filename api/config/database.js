require("dotenv").config();
const { Pool } = require("pg");

//const pool = new Pool({
// user: process.env.DB_USER,
//host: process.env.DB_HOST,
//database: process.env.DB_NAME,
//password: process.env.DB_PASSWORD,
//port: process.env.DB_PORT,
//});

const pool = new Pool({
	connectionString: process.env.POSTGRES_URL,
	ssl: {
		rejectUnauthorized: false, // Adjust based on your Supabase configuration
	},
});

module.exports = pool;
