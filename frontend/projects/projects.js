const API_URL = "http://localhost:5000/api";

const searchInput =
    document.getElementById("searchInput");

const projectGrid =
    document.getElementById("projectGrid");

const emptyState =
    document.getElementById("emptyState");

const filters =
    document.querySelectorAll(".filter");

const sortSelect =
    document.getElementById("sortProjects");

const createProject =
    document.getElementById("createProject");

const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.querySelector(".sidebar");

let currentFilter = "all";


/* =========================
   AUTH
========================= */

function getToken() {
    return localStorage.getItem("devguardToken");
}


function requireProjectsLogin() {

    const token = getToken();

    if (!token) {
        window.location.href =
            "../login/index.html";

        return false;
    }

    return true;
}


/* =========================
   MOBILE MENU
========================= */

if (menuButton && sidebar) {

    menuButton.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "open"
            );

        }
    );

}


/* =========================
   LOAD PROJECTS FROM MYSQL
========================= */

async function loadProjectsFromDatabase() {

    if (!requireProjectsLogin()) {
        return;
    }

    const token =
        getToken();

    try {

        const response =
            await fetch(
                `${API_URL}/projects`,
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            localStorage.removeItem(
                "devguardToken"
            );

            localStorage.removeItem(
                "devguardUser"
            );

            window.location.href =
                "../login/index.html";

            return;
        }


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load projects"
            );

        }


        renderDatabaseProjects(
            data.projects || []
        );


    } catch (error) {

        console.error(
            "Project loading error:",
            error
        );

    }

}


/* =========================
   RENDER DATABASE PROJECTS
========================= */

function renderDatabaseProjects(
    projects
) {

    if (!projectGrid) {
        return;
    }


    /*
        Keep the existing HTML cards
        for now.

        Database projects are added
        above them.
    */

    projects.forEach(
        project => {

            const existingCard =
                [...document.querySelectorAll(
                    ".project-card"
                )].find(
                    card =>
                        card.dataset.projectId ===
                        String(project.id)
                );


            if (existingCard) {
                return;
            }


            const card =
                createProjectCard(
                    project
                );


            projectGrid.prepend(
                card
            );

        }
    );


    filterProjects();

}


/* =========================
   CREATE PROJECT CARD
========================= */

function createProjectCard(
    project
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "project-card";


    card.dataset.projectId =
        project.id;


    card.dataset.name =
        project.name;


    card.dataset.status =
        normalizeStatus(
            project.status
        );


    card.dataset.risk =
        getRiskLevel(
            project.risk_score
        );


    const risk =
        Number(
            project.risk_score || 0
        );


    const riskLevel =
        getRiskLevel(
            risk
        );


    const riskText =
        `${risk} ${riskLevel.toUpperCase()}`;


    card.innerHTML = `

        <div class="project-top">

            <div class="project-logo blue">

                ${escapeHTML(
                    project.name
                        .charAt(0)
                        .toUpperCase()
                )}

            </div>

            <button
                class="card-menu"
                type="button">

                •••

            </button>

        </div>


        <div class="project-title">

            <h2>
                ${escapeHTML(
                    project.name
                )}
            </h2>

            <span>
                ${escapeHTML(
                    project.description ||
                    "DevOps Project"
                )}
            </span>

        </div>


        <div class="repository">

            <span>⌘</span>

            ${escapeHTML(
                project.repository ||
                "No repository"
            )}

        </div>


        <div class="branch">

            ⎇ ${escapeHTML(
                project.branch ||
                "main"
            )}

        </div>


        <div class="project-divider"></div>


        <div class="project-stats">

            <div>

                <span>Risk</span>

                <strong
                    class="${riskLevel}-text">

                    ${riskText}

                </strong>

            </div>


            <div>

                <span>Build</span>

                <strong class="success-text">

                    ✓ Ready

                </strong>

            </div>

        </div>


        <div class="project-footer">

            <div class="health">

                <span></span>

                ${escapeHTML(
                    project.status ||
                    "Active"
                )}

            </div>


            <small>

                ${formatDate(
                    project.created_at
                )}

            </small>

        </div>

    `;


    return card;

}


/* =========================
   SEARCH + FILTER
========================= */

function filterProjects() {

    const search =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    let visible = 0;


    cards.forEach(
        card => {

            const name =
                (
                    card.dataset.name ||
                    ""
                ).toLowerCase();


            const status =
                card.dataset.status ||
                "";


            const matchesSearch =
                name.includes(
                    search
                );


            const matchesFilter =
                currentFilter === "all" ||
                status === currentFilter;


            if (
                matchesSearch &&
                matchesFilter
            ) {

                card.style.display =
                    "block";

                visible++;

            } else {

                card.style.display =
                    "none";

            }

        }
    );


    if (emptyState) {

        emptyState.style.display =
            visible === 0
                ? "block"
                : "none";

    }

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProjects
    );

}


/* =========================
   FILTER BUTTONS
========================= */

filters.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                filters.forEach(
                    item =>
                        item.classList
                            .remove("active")
                );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                filterProjects();

            }
        );

    }
);


/* =========================
   SORT
========================= */

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        () => {

            const cards =
                [
                    ...document.querySelectorAll(
                        ".project-card"
                    )
                ];


            const value =
                sortSelect.value;


            if (
                value === "name"
            ) {

                cards.sort(
                    (a, b) =>
                        (
                            a.dataset.name ||
                            ""
                        ).localeCompare(
                            b.dataset.name ||
                            ""
                        )
                );

            }


            if (
                value === "risk"
            ) {

                const riskValue = {
                    low: 1,
                    medium: 2,
                    high: 3
                };


                cards.sort(
                    (a, b) =>
                        (
                            riskValue[
                                a.dataset.risk
                            ] || 0
                        ) -
                        (
                            riskValue[
                                b.dataset.risk
                            ] || 0
                        )
                );

            }


            cards.forEach(
                card =>
                    projectGrid.appendChild(
                        card
                    )
            );

        }
    );

}


/* =========================
   NEW PROJECT
========================= */

if (createProject) {

    createProject.addEventListener(
        "click",
        async () => {

            const projectName =
                prompt(
                    "Enter your new project name:"
                );


            if (!projectName) {
                return;
            }


            const description =
                prompt(
                    "Enter project description:"
                ) || "";


            const repository =
                prompt(
                    "Enter repository name or URL:"
                ) || "";


            const branch =
                prompt(
                    "Enter branch:",
                    "main"
                ) || "main";


            const token =
                getToken();


            if (!token) {

                window.location.href =
                    "../login/index.html";

                return;

            }


            try {

                createProject.disabled =
                    true;


                createProject.textContent =
                    "Creating...";


                const response =
                    await fetch(
                        `${API_URL}/projects`,
                        {
                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${token}`

                            },

                            body:
                                JSON.stringify({

                                    name:
                                        projectName,

                                    description:
                                        description,

                                    repository:
                                        repository,

                                    branch:
                                        branch

                                })

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to create project"
                    );

                }


                const card =
                    createProjectCard(
                        data.project
                    );


                projectGrid.prepend(
                    card
                );


                filterProjects();


                alert(
                    "Project created successfully!"
                );


            } catch (error) {

                console.error(
                    "Create project error:",
                    error
                );


                alert(
                    error.message
                );

            } finally {

                createProject.disabled =
                    false;

                createProject.textContent =
                    "New Project";

            }

        }
    );

}


/* =========================
   PROJECT CARD CLICK
========================= */

document.addEventListener(
    "click",
    event => {

        const card =
            event.target.closest(
                ".project-card"
            );


        if (!card) {
            return;
        }


        /*
            Don't open project details
            when the three-dot menu
            is clicked.
        */

        if (
            event.target.closest(
                ".card-menu"
            )
        ) {
            return;
        }


        const projectId =
            card.dataset.projectId;


        const projectName =
            card.dataset.name;


        if (projectId) {

            window.location.href =
                `../project-details/index.html?id=${encodeURIComponent(
                    projectId
                )}`;

            return;

        }


        /*
            Old demo cards don't have
            a database ID yet.
        */

        window.location.href =
            `../project-details/index.html?project=${encodeURIComponent(
                projectName
            )}`;

    }
);


/* =========================
   HELPERS
========================= */

function normalizeStatus(
    status
) {

    const value =
        String(
            status || ""
        ).toLowerCase();


    if (
        value === "healthy" ||
        value === "active"
    ) {
        return "healthy";
    }


    if (
        value === "warning" ||
        value === "needs attention"
    ) {
        return "warning";
    }


    if (
        value === "failed" ||
        value === "inactive"
    ) {
        return "failed";
    }


    return "healthy";

}


function getRiskLevel(
    score
) {

    score =
        Number(score || 0);


    if (score >= 70) {
        return "high";
    }


    if (score >= 40) {
        return "medium";
    }


    return "low";

}


function formatDate(
    date
) {

    if (!date) {
        return "Just now";
    }


    const value =
        new Date(date);


    if (
        Number.isNaN(
            value.getTime()
        )
    ) {
        return "Just now";
    }


    return value.toLocaleDateString();

}


function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================
   START
========================= */

loadProjectsFromDatabase();