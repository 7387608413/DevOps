if (!requireLogin()) {
    throw new Error("User is not authenticated");
}

showUser();
const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.querySelector(".sidebar");


/* MOBILE SIDEBAR */

menuButton.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});


/* NAVIGATION */



/* DEPLOYMENT BUTTON */

const deployButton =
    document.querySelector(".deploy-button");


deployButton.addEventListener("click", () => {

    deployButton.innerHTML =
        "⏳ Starting deployment...";

    deployButton.disabled = true;


    setTimeout(() => {

        deployButton.innerHTML =
            "✓ Deployment Started";

        setTimeout(() => {

            deployButton.innerHTML =
                "<span>+</span> New Deployment";

            deployButton.disabled = false;

        }, 1800);

    }, 1200);

});


/* RISK SCORE ANIMATION */

const riskScore =
    document.getElementById("riskScore");

const circleScore =
    document.getElementById("circleScore");

const progress =
    document.getElementById("riskProgress");


let currentScore = 0;

const targetScore = 32;


const riskAnimation =
    setInterval(() => {

        currentScore++;

        riskScore.textContent =
            currentScore;

        circleScore.textContent =
            currentScore;

        progress.style.width =
            currentScore + "%";


        if (currentScore >= targetScore) {

            clearInterval(riskAnimation);

        }

    }, 25);