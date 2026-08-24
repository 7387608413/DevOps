const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.querySelector(".sidebar");

const alertSearch =
    document.getElementById("alertSearch");

const severityFilter =
    document.getElementById("severityFilter");

const statusFilter =
    document.getElementById("statusFilter");

const serviceFilter =
    document.getElementById("serviceFilter");

const resetFilters =
    document.getElementById("resetFilters");

const markAll =
    document.getElementById("markAll");

const alertList =
    document.getElementById("alertList");

const emptyState =
    document.getElementById("emptyState");

const sidebarAlertCount =
    document.getElementById("sidebarAlertCount");

const criticalCount =
    document.getElementById("criticalCount");

const warningCount =
    document.getElementById("warningCount");

const infoCount =
    document.getElementById("infoCount");


/* =========================
   MOBILE MENU
========================= */

menuButton.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);


/* =========================
   ALERT FILTERING
========================= */

function filterAlerts() {

    const search =
        alertSearch.value
            .toLowerCase()
            .trim();

    const severity =
        severityFilter.value;

    const status =
        statusFilter.value;

    const service =
        serviceFilter.value;


    const rows =
        document.querySelectorAll(
            ".alert-row"
        );


    let visibleCount = 0;


    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();

        const rowSeverity =
            row.dataset.severity;

        const rowStatus =
            row.dataset.status;

        const rowService =
            row.dataset.service;


        const searchMatch =
            !search ||
            text.includes(search);


        const severityMatch =
            severity === "all" ||
            rowSeverity === severity;


        const statusMatch =
            status === "all" ||
            rowStatus === status;


        const serviceMatch =
            service === "all" ||
            rowService === service;


        const visible =
            searchMatch &&
            severityMatch &&
            statusMatch &&
            serviceMatch;


        if (visible) {

            row.style.display =
                "grid";

            visibleCount++;

        } else {

            row.style.display =
                "none";

        }

    });


    if (visibleCount === 0) {

        emptyState.style.display =
            "block";

    } else {

        emptyState.style.display =
            "none";

    }

}


/* =========================
   EVENT LISTENERS
========================= */

alertSearch.addEventListener(
    "input",
    filterAlerts
);

severityFilter.addEventListener(
    "change",
    filterAlerts
);

statusFilter.addEventListener(
    "change",
    filterAlerts
);

serviceFilter.addEventListener(
    "change",
    filterAlerts
);


/* =========================
   RESET
========================= */

resetFilters.addEventListener(
    "click",
    () => {

        alertSearch.value = "";

        severityFilter.value =
            "all";

        statusFilter.value =
            "all";

        serviceFilter.value =
            "all";

        filterAlerts();

    }
);


/* =========================
   ACKNOWLEDGE ALERT
========================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                '[data-action="acknowledge"]'
            );


        if (!button) {
            return;
        }


        const row =
            button.closest(
                ".alert-row"
            );


        if (!row) {
            return;
        }


        row.classList.remove(
            "unread"
        );


        row.dataset.status =
            "acknowledged";


        button.outerHTML = `
            <span class="acknowledged-badge">
                ✓ Acknowledged
            </span>
        `;


        updateCounts();

    }
);


/* =========================
   MARK ALL AS READ
========================= */

markAll.addEventListener(
    "click",
    () => {

        const unreadRows =
            document.querySelectorAll(
                ".alert-row.unread"
            );


        unreadRows.forEach(row => {

            row.classList.remove(
                "unread"
            );

        });


        markAll.textContent =
            "✓ All alerts read";


        setTimeout(() => {

            markAll.textContent =
                "✓ Mark all as read";

        }, 1800);

    }
);


/* =========================
   UPDATE COUNTS
========================= */

function updateCounts() {

    const rows =
        document.querySelectorAll(
            ".alert-row"
        );


    let critical = 0;
    let warning = 0;
    let info = 0;
    let active = 0;


    rows.forEach(row => {

        const severity =
            row.dataset.severity;

        const status =
            row.dataset.status;


        if (status === "active") {

            active++;

        }


        if (severity === "critical") {

            critical++;

        }


        if (severity === "warning") {

            warning++;

        }


        if (severity === "info") {

            info++;

        }

    });


    criticalCount.textContent =
        critical;

    warningCount.textContent =
        warning;

    infoCount.textContent =
        info;

    sidebarAlertCount.textContent =
        active;

}


/* =========================
   SIMULATE LIVE ALERT
========================= */

setInterval(() => {

    const rows =
        document.querySelectorAll(
            ".alert-row"
        );


    /*
       Small visual live update.
       This will not create a new
       backend alert yet.
    */

    rows.forEach(row => {

        if (
            row.dataset.status ===
            "active"
        ) {

            const timeElement =
                row.querySelector(
                    ".alert-meta span:nth-child(2)"
                );


            if (
                timeElement &&
                Math.random() > .8
            ) {

                timeElement.textContent =
                    "◷ just now";

            }

        }

    });

}, 5000);


/* =========================
   INITIALIZE
========================= */

filterAlerts();

updateCounts();