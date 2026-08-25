if (typeof requireLogin === "function") {
    requireLogin();
}

if (typeof showUser === "function") {
    showUser();
}


/* =========================
   PROJECT DATA
========================= */

const projectData = {

    "Backend API": {
        description: "Core backend API service",
        repository: "company/backend-api",
        branch: "main",
        risk: 24,
        status: "Healthy"
    },

    "Web Frontend": {
        description: "Customer Dashboard",
        repository: "company/web-frontend",
        branch: "main",
        risk: 31,
        status: "Healthy"
    },

    "Payment Service": {
        description: "Payment Processing",
        repository: "company/payment-service",
        branch: "release",
        risk: 78,
        status: "Needs attention"
    },

    "Mobile API": {
        description: "Mobile Application",
        repository: "company/mobile-api",
        branch: "main",
        risk: 18,
        status: "Healthy"
    },

    "Auth Service": {
        description: "Authentication",
        repository: "company/auth-service",
        branch: "main",
        risk: 12,
        status: "Healthy"
    },

    "Notification Service": {
        description: "Messaging Platform",
        repository: "company/notification-service",
        branch: "develop",
        risk: 47,
        status: "Healthy"
    }

};


/* =========================
   LOAD PROJECT
========================= */

const params =
    new URLSearchParams(
        window.location.search
    );

const projectName =
    params.get("project") ||
    "Backend API";


const project =
    projectData[projectName] ||
    projectData["Backend API"];


/* =========================
   DISPLAY DATA
========================= */

document.title =
    `DevGuard | ${projectName}`;


document.getElementById(
    "projectName"
).textContent =
    projectName;


document.getElementById(
    "breadcrumbProject"
).textContent =
    projectName;


document.getElementById(
    "projectDescription"
).textContent =
    project.description;


document.getElementById(
    "repository"
).textContent =
    project.repository;


document.getElementById(
    "projectBranch"
).textContent =
    project.branch;


document.getElementById(
    "detailBranch"
).textContent =
    project.branch;


document.getElementById(
    "riskScore"
).textContent =
    project.risk;


document.getElementById(
    "largeRiskScore"
).textContent =
    project.risk;


document.getElementById(
    "projectStatus"
).textContent =
    project.status;


document.getElementById(
    "projectLogo"
).textContent =
    projectName
        .charAt(0)
        .toUpperCase();


/* =========================
   NAVIGATION
========================= */

function openPipeline() {

    window.location.href =
        "../pipeline/index.html";

}


function openRiskAnalysis() {

    window.location.href =
        "../risk-analysis/index.html";

}


function openDeployments() {

    window.location.href =
        "../deployments/index.html";

}


/* =========================
   DEPLOY
========================= */

const deployButton =
    document.getElementById(
        "deployButton"
    );


const toast =
    document.getElementById(
        "toast"
    );


const toastTitle =
    document.getElementById(
        "toastTitle"
    );


const toastMessage =
    document.getElementById(
        "toastMessage"
    );


function showToast(
    title,
    message
) {

    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;

    toast.classList.add(
        "show"
    );


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2500);

}


deployButton.addEventListener(
    "click",
    () => {

        deployButton.disabled =
            true;

        deployButton.textContent =
            "⏳ Starting...";


        setTimeout(() => {

            deployButton.disabled =
                false;

            deployButton.textContent =
                "✓ Deploy Started";


            showToast(
                "Deployment Started",
                `${projectName} deployment has been queued.`
            );


            setTimeout(() => {

                deployButton.textContent =
                    "🚀 Deploy";

            }, 1800);

        }, 900);

    }
);


/* =========================
   REPOSITORY
========================= */

document.getElementById(
    "repositoryButton"
).addEventListener(
    "click",
    () => {

        showToast(
            "Repository",
            `${project.repository} is connected.`
        );

    }
);


/* =========================
   MOBILE MENU
========================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const sidebar =
    document.querySelector(
        ".sidebar"
    );


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