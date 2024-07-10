const { Client } = require("pg");
require("dotenv").config();

const databaseName = process.env.DB_NAME;

const client = new Client({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

async function createDatabase() {
	try {
		await client.connect();
		const res = await client.query(
			`SELECT 1 FROM pg_database WHERE datname='${databaseName}'`
		);

		if (res.rowCount === 0) {
			await client.query(`CREATE DATABASE "${databaseName}"`);
			console.log(`Database ${databaseName} created successfully!`);
		} else {
			console.log(`Database ${databaseName} already exists.`);
		}
	} catch (err) {
		console.error("Error creating database:", err);
	} finally {
		await client.end();
	}
}

createDatabase();
