const pool = require("./database");

const createUsersTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
             userId UUID PRIMARY KEY,
             firstName VARCHAR(255) NOT NULL,
             VARCHAR(255) NOT NULL,
             email VARCHAR(255) UNIQUE NOT NULL,
             password VARCHAR(255) NOT NULL,
             phone VARCHAR(50)
        )
    `;

    try {
        const client = await pool.connect();
        await client.query(createTableQuery);
        console.log('Table "users" created successfully');
        client.release();
    } catch (err) {
        console.error('Error creating table', err);
    }
};

createUsersTable();
