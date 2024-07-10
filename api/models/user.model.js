const pool = require('../config/database');

const createUser = async (user) => {
    const { userId, firstName, lastName, email, password, phone } = user;
    const query = `INSERT INTO users (userId, firstName, lastName, email, password, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [userId, firstName, lastName, email, password, phone];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const getUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
};

const getUserById = async (userId) => {
    const query = `SELECT * FROM users WHERE userId = $1`;
    const { rows } = await pool.query(query, [userId]);
    return rows[0];
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
};