const { pool } = require("../config/db");

async function createUser(firstName, lastName, email, password, role = "Developer") {

    const sql = `
        INSERT INTO users
        (first_name, last_name, email, password, role)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
        firstName,
        lastName,
        email,
        password,
        role
    ]);

    return result.insertId;
}


async function findUserByEmail(email) {

    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [email]);

    return rows[0];
}


async function findUserById(id) {

    const sql = `
        SELECT
            id,
            first_name,
            last_name,
            email,
            role,
            created_at
        FROM users
        WHERE id = ?
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [id]);

    return rows[0];
}


module.exports = {
    createUser,
    findUserByEmail,
    findUserById
};