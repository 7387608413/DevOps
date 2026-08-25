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


/* =========================
   MOBILE MENU
========================= */

menuButton.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});


/* =========================
   SEARCH + FILTER
========================= */

let currentFilter = "all";


function filterProjects() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const cards =
        document.querySelectorAll(".project-card");

    let visible = 0;


    cards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const status =
            card.dataset.status;

        const matchesSearch =
            name.includes(search);

        const matchesFilter =
            currentFilter === "all" ||
            status === currentFilter;


        if (
            matchesSearch &&
            matchesFilter
        ) {

            card.style.display = "block";

            visible++;

        } else {

            card.style.display = "none";

        }

    });


    if (visible === 0) {

        emptyState.style.display =
            "block";

    } else {

        emptyState.style.display =
            "none";

    }

}


searchInput.addEventListener(
    "input",
    filterProjects
);


/* =========================
   FILTER BUTTONS
========================= */

filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(item => {

            item.classList.remove("active");

        });

        button.classList.add("active");

        currentFilter =
            button.dataset.filter;

        filterProjects();

    });

});


/* =========================
   SORT
========================= */

sortSelect.addEventListener(
    "change",
    () => {

        const cards =
            [...document.querySelectorAll(
                ".project-card"
            )];

        const value =
            sortSelect.value;


        if (value === "name") {

            cards.sort((a,b) =>

                a.dataset.name.localeCompare(
                    b.dataset.name
                )

            );

        }


        if (value === "risk") {

            const riskValue = {
                low: 1,
                medium: 2,
                high: 3
            };

            cards.sort((a,b) =>

                riskValue[a.dataset.risk] -
                riskValue[b.dataset.risk]

            );

        }


        cards.forEach(card => {

            projectGrid.appendChild(card);

        });

    }
);


/* =========================
   NEW PROJECT
========================= */

createProject.addEventListener(
    "click",
    () => {

        const projectName =
            prompt(
                "Enter your new project name:"
            );


        if (!projectName) {
            return;
        }


        const card =
            document.createElement("article");


        card.className =
            "project-card";

        card.dataset.status =
            "healthy";

        card.dataset.name =
            projectName;

        card.dataset.risk =
            "low";


        card.innerHTML = `

            <div class="project-top">

                <div class="project-logo blue">
                    ${projectName
                        .charAt(0)
                        .toUpperCase()}
                </div>

                <button class="card-menu">
                    •••
                </button>

            </div>


            <div class="project-title">

                <h2>
                    ${projectName}
                </h2>

                <span>
                    New Project
                </span>

            </div>


            <div class="repository">

                <span>⌘</span>

                Your Repository

            </div>


            <div class="branch">
                ⎇ main
            </div>


            <div class="project-divider"></div>


            <div class="project-stats">

                <div>

                    <span>Risk</span>

                    <strong class="low-text">
                        0 LOW
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

                    Healthy

                </div>

                <small>
                    Just now
                </small>

            </div>
        `;


        projectGrid.prepend(card);


        filterProjects();

    }
);


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


        if (
            event.target.closest(
                ".card-menu"
            )
        ) {

            return;

        }


        const projectName =
    card.dataset.name;

window.location.href =
    `../project-details/index.html?project=${encodeURIComponent(projectName)}`;

    }
);
async function loadProjectsFromDatabase() {
    const token = localStorage.getItem("devguardToken");

    if (!token) {
        window.location.href = "../login/index.html";
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}/projects`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to load projects"
            );
        }

        console.log("Projects from MySQL:", data.projects);

    } catch (error) {
        console.error(
            "Project loading error:",
            error
        );
    }
}
loadProjectsFromDatabase();