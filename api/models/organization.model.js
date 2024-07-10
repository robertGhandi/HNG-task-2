const pool = require('../config/database');

const createOrganisation = async (organisation) => {
    const { orgId, name, description } = organisation;
    const query = `INSERT INTO organisations (orgId, name, description) VALUES ($1, $2, $3) RETURNING *`;
    const values = [orgId, name, description];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const getOrganisationsByUserId = async (userId) => {
    const query = `
        SELECT o.* FROM organisations o
        JOIN user_organisations uo ON o.orgId = uo.orgId
        WHERE uo.userId = $1
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
};

const getOrganisationById = async (orgId) => {
    const query = `SELECT * FROM organisations WHERE orgId = $1`;
    const { rows } = await pool.query(query, [orgId]);
    return rows[0];
};

module.exports = {
    createOrganisation,
    getOrganisationsByUserId,
    getOrganisationById,
};