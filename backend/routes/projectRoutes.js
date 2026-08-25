const express = require("express");

const {
    addProject,
    listProjects,
    getProject
} = require("../controllers/projectController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const router = express.Router();


/*
    GET /api/projects

    Get all projects
*/
router.get(
    "/",
    authenticateToken,
    listProjects
);


/*
    GET /api/projects/:id

    Get one project
*/
router.get(
    "/:id",
    authenticateToken,
    getProject
);


/*
    POST /api/projects

    Create a new project
*/
router.post(
    "/",
    authenticateToken,
    addProject
);


module.exports = router;