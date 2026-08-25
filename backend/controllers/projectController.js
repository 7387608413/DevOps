const {
    createProject,
    getProjects,
    getProjectById
} = require("../models/projectModel");


/* =========================
   CREATE PROJECT
========================= */

async function addProject(req, res) {

    try {

        const {
            name,
            description,
            repository,
            branch
        } = req.body;


        if (!name) {

            return res.status(400).json({
                success: false,
                message: "Project name is required"
            });

        }


        // Get logged-in user from JWT
        const ownerId =
            req.user ? req.user.id : null;


        const projectId =
            await createProject(
                name,
                description,
                repository,
                branch,
                ownerId
            );


        const project =
            await getProjectById(projectId);


        return res.status(201).json({

            success: true,

            message: "Project created successfully",

            project

        });


    } catch (error) {

        console.error(
            "Create project error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Server error while creating project"

        });

    }

}


/* =========================
   GET ALL PROJECTS
========================= */

async function listProjects(req, res) {

    try {

        const projects =
            await getProjects();


        return res.status(200).json({

            success: true,

            projects

        });


    } catch (error) {

        console.error(
            "Get projects error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Server error while loading projects"

        });

    }

}


/* =========================
   GET PROJECT BY ID
========================= */

async function getProject(req, res) {

    try {

        const {
            id
        } = req.params;


        const project =
            await getProjectById(id);


        if (!project) {

            return res.status(404).json({

                success: false,

                message:
                    "Project not found"

            });

        }


        return res.status(200).json({

            success: true,

            project

        });


    } catch (error) {

        console.error(
            "Get project error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Server error while loading project"

        });

    }

}


module.exports = {
    addProject,
    listProjects,
    getProject
};