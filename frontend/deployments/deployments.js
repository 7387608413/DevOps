const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.querySelector(".sidebar");

const searchInput =
    document.getElementById("deploymentSearch");

const environmentFilter =
    document.getElementById("environmentFilter");

const statusFilter =
    document.getElementById("statusFilter");

const resetFilters =
    document.getElementById("resetFilters");

const deploymentRows =
    document.querySelectorAll(".deployment-row");

const deployButton =
    document.getElementById("deployButton");

const rollbackButton =
    document.getElementById("rollbackButton");


/* =========================
   MOBILE MENU
========================= */

menuButton.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});


/* =========================
   FILTER DEPLOYMENTS
========================= */

function filterDeployments() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const environment =
        environmentFilter.value;

    const status =
        statusFilter.value;


    deploymentRows.forEach(row => {

        const text =
            row.textContent.toLowerCase();

        const rowEnvironment =
            row.dataset.environment;

        const rowStatus =
            row.dataset.status;


        const matchesSearch =
            !search ||
            text.includes(search);


        const matchesEnvironment =
            environment === "all" ||
            rowEnvironment === environment;


        const matchesStatus =
            status === "all" ||
            rowStatus === status;


        if (
            matchesSearch &&
            matchesEnvironment &&
            matchesStatus
        ) {

            row.style.display = "grid";

        } else {

            row.style.display = "none";

        }

    });

}


searchInput.addEventListener(
    "input",
    filterDeployments
);

environmentFilter.addEventListener(
    "change",
    filterDeployments
);

statusFilter.addEventListener(
    "change",
    filterDeployments
);


/* =========================
   RESET FILTERS
========================= */

resetFilters.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        environmentFilter.value =
            "all";

        statusFilter.value =
            "all";

        filterDeployments();

    }
);


/* =========================
   NEW DEPLOYMENT
========================= */

deployButton.addEventListener(
    "click",
    () => {

        deployButton.disabled = true;

        deployButton.innerHTML = `
            <span>⏳</span>
            Preparing...
        `;


        setTimeout(() => {

            deployButton.innerHTML = `
                <span>✓</span>
                Deployment Ready
            `;


            setTimeout(() => {

                deployButton.disabled =
                    false;

                deployButton.innerHTML = `
                    <span>🚀</span>
                    New Deployment
                `;

            }, 1800);

        }, 1200);

    }
);


/* =========================
   ROLLBACK
========================= */

rollbackButton.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Are you sure you want to rollback v2.4.1?"
            );


        if (!confirmed) {
            return;
        }


        rollbackButton.disabled = true;

        rollbackButton.textContent =
            "↶ Rolling back...";


        setTimeout(() => {

            rollbackButton.textContent =
                "✓ Rollback Complete";

            rollbackButton.style.color =
                "#4ade80";

            rollbackButton.style.borderColor =
                "rgba(34,197,94,.2)";

            rollbackButton.style.background =
                "rgba(34,197,94,.05)";


        }, 1800);

    }
);


/* =========================
   PAGINATION DEMO
========================= */

const pageButtons =
    document.querySelectorAll(
        ".pagination button"
    );


pageButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (
                button.textContent ===
                "..." ||
                button.classList.contains(
                    "current"
                )
            ) {
                return;
            }


            pageButtons.forEach(btn => {

                btn.classList.remove(
                    "current"
                );

            });


            button.classList.add(
                "current"
            );

        }
    );

});