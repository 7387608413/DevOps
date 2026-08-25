const { pool } = require("../config/db");

async function createProject(
    name,
    description,
    repository,
    branch,
    ownerId
) {
    const sql = `
        INSERT INTO projects
        (name, description, repository, branch, owner_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
        name,
        description || "",
        repository || "",
        branch || "main",
        ownerId || null
    ]);

    return result.insertId;
}


async function getProjects() {
    const sql = `
        SELECT
            id,
            name,
            description,
            repository,
            branch,
            status,
            risk_score,
            owner_id,
            created_at
        FROM projects
        ORDER BY created_at DESC
    `;

    const [rows] = await pool.execute(sql);

    return rows;
}


async function getProjectById(id) {
    const sql = `
        SELECT
            id,
            name,
            description,
            repository,
            branch,
            status,
            risk_score,
            owner_id,
            created_at
        FROM projects
        WHERE id = ?
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [id]);

    return rows[0];
}


module.exports = {
    createProject,
    getProjects,
    getProjectById
};