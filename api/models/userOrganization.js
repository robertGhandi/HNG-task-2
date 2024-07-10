const pool = require('../config/database');

const addUserToOrganisation = async (userId, orgId) => {
    const query = `INSERT INTO user_organisations (userId, orgId) VALUES ($1, $2) RETURNING *`;
    const values = [userId, orgId];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

module.exports = {
    addUserToOrganisation,
};