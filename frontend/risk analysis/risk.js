const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.querySelector(".sidebar");

const analyzeButton =
    document.getElementById("analyzeButton");

const riskScore =
    document.getElementById("riskScore");


/* =========================
   MOBILE SIDEBAR
========================= */

menuButton.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});


/* =========================
   RUN RISK ANALYSIS
========================= */

analyzeButton.addEventListener("click", () => {

    analyzeButton.disabled = true;

    analyzeButton.innerHTML = `
        <span class="spinner"></span>
        Analyzing...
    `;


    let score = 0;

    const targetScore =
        Math.floor(
            Math.random() * 35
        ) + 20;


    const animation =
        setInterval(() => {

            score++;

            riskScore.textContent =
                score;


            if (score >= targetScore) {

                clearInterval(animation);

                analyzeButton.disabled = false;

                analyzeButton.innerHTML = `
                    <span>✓</span>
                    Analysis Complete
                `;


                setTimeout(() => {

                    analyzeButton.innerHTML = `
                        <span>✦</span>
                        Run Analysis
                    `;

                }, 2000);

            }

        }, 30);

});


/* =========================
   NAVIGATION
========================= */

const navItems =
    document.querySelectorAll(".nav-item");


navItems.forEach(item => {

    item.addEventListener("click", function(event) {

        const href =
            this.getAttribute("href");


        if (
            href &&
            href !== "#" &&
            href !== "index.html"
        ) {

            return;

        }


        event.preventDefault();


        navItems.forEach(nav => {
            nav.classList.remove("active");
        });


        this.classList.add("active");

    });

});