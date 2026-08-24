const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.querySelector(".sidebar");

const runPipeline =
    document.getElementById("runPipeline");

const pipelineStatus =
    document.getElementById("pipelineStatus");

const terminal =
    document.getElementById("terminal");

const clearLogs =
    document.getElementById("clearLogs");

const stages =
    document.querySelectorAll(".stage");

const connectors =
    document.querySelectorAll(".connector");


/* =========================
   MOBILE MENU
========================= */

menuButton.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});


/* =========================
   TERMINAL LOG
========================= */

function addLog(type, message) {

    const now =
        new Date().toLocaleTimeString(
            "en-US",
            {
                hour12: false
            }
        );

    const line =
        document.createElement("div");

    line.innerHTML = `
        <span class="time">
            ${now}
        </span>

        <span class="${type}">
            ${type.toUpperCase()}
        </span>

        ${message}
    `;

    terminal.appendChild(line);

    terminal.scrollTop =
        terminal.scrollHeight;
}


/* =========================
   RUN PIPELINE
========================= */

runPipeline.addEventListener(
    "click",
    async () => {

        runPipeline.disabled = true;

        runPipeline.innerHTML = `
            <span>⏳</span>
            Running...
        `;

        pipelineStatus.textContent =
            "Pipeline Running";

        pipelineStatus
            .closest(".pipeline-status")
            .querySelector(".status-dot")
            .style.background =
            "#3b82f6";


        /* RESET */

        stages.forEach(stage => {

            stage.classList.remove(
                "completed",
                "running",
                "failed"
            );

            stage.classList.add("pending");

            stage.querySelector("span").textContent =
                "Waiting";

            stage.querySelector(".stage-icon").textContent =
                "•";

        });


        connectors.forEach(connector => {

            connector.classList.remove(
                "completed-connector",
                "active"
            );

        });


        terminal.innerHTML = "";


        const pipelineSteps = [

            {
                logType: "info",
                message: "Starting new pipeline execution..."
            },

            {
                logType: "info",
                message: "Checking source repository..."
            },

            {
                logType: "success",
                message: "Commit 8f3a2c1 detected."
            },

            {
                logType: "info",
                message: "Building application..."
            },

            {
                logType: "success",
                message: "Build completed successfully."
            },

            {
                logType: "info",
                message: "Running unit tests..."
            },

            {
                logType: "success",
                message: "124 / 124 tests passed."
            },

            {
                logType: "info",
                message: "Running security scan..."
            },

            {
                logType: "success",
                message: "No critical vulnerabilities detected."
            },

            {
                logType: "info",
                message: "Calculating deployment risk..."
            },

            {
                logType: "success",
                message: "Risk score: 32 LOW."
            }

        ];


        let stepIndex = 0;


        /* CODE COMMIT */

        stages[0].classList.remove("pending");

        stages[0].classList.add("running");

        stages[0].querySelector(".stage-icon").textContent =
            "●";

        stages[0].querySelector("span").textContent =
            "Checking";


        addLog(
            pipelineSteps[stepIndex].logType,
            pipelineSteps[stepIndex].message
        );

        stepIndex++;


        await wait(1200);


        completeStage(
            0,
            "Completed",
            "✓"
        );


        await wait(500);


        /* BUILD */

        activateStage(
            1,
            "Building"
        );

        connectors[0].classList.add("completed-connector");

        connectors[1].classList.add("active");


        addLog(
            pipelineSteps[stepIndex].logType,
            pipelineSteps[stepIndex].message
        );

        stepIndex++;


        await wait(1400);


        addLog(
            pipelineSteps[stepIndex].logType,
            pipelineSteps[stepIndex].message
        );

        stepIndex++;


        completeStage(
            1,
            "Completed",
            "✓"
        );


        connectors[1].classList.remove("active");

        connectors[1].classList.add(
            "completed-connector"
        );


        await wait(500);


        /* TEST */

        activateStage(
            2,
            "Running"
        );

        connectors[2].classList.add("active");


        addLog(
            pipelineSteps[stepIndex].logType,
            pipelineSteps[stepIndex].message
        );

        stepIndex++;


        await wait(1300);


        addLog(
            pipelineSteps[stepIndex].logType,
            pipelineSteps[stepIndex].message
        );

        stepIndex++;


        completeStage(
            2,
            "124 passed",
            "✓"
        );


        connectors[2].classList.remove("active");

        connectors[2].classList.add(
            "completed-connector"
        );


        await wait(500);


        /* SECURITY */

        activateStage(
            3,
            "Scanning"
        );

        connectors[3].classList.add("active");


        addLog(
            pipelineSteps[stepIndex].logType,
            pipelineSteps[stepIndex].message
        );

        stepIndex++;


        await wait(1400);


        addLog(
            pipelineSteps[stepIndex].logType,
            pipelineSteps[stepIndex].message
        );

        stepIndex++;


        completeStage(
            3,
            "Passed",
            "✓"
        );


        connectors[3].classList.remove("active");

        connectors[3].classList.add(
            "completed-connector"
        );


        await wait(500);


        /* RISK */

        activateStage(
            4,
            "Analyzing"
        );

        connectors[4].classList.add("active");


        addLog(
            pipelineSteps[stepIndex].logType,
            pipelineSteps[stepIndex].message
        );

        stepIndex++;


        await wait(1300);


        addLog(
            pipelineSteps[stepIndex].logType,
            pipelineSteps[stepIndex].message
        );

        stepIndex++;


        completeStage(
            4,
            "Score 32",
            "✓"
        );


        connectors[4].classList.remove("active");

        connectors[4].classList.add(
            "completed-connector"
        );


        await wait(700);


        /* APPROVAL */

        activateStage(
            5,
            "Required"
        );

        connectors[5].classList.add("active");


        pipelineStatus.textContent =
            "Approval Required";


        addLog(
            "info",
            "Risk gate passed. Waiting for approval..."
        );


        await wait(1500);


        completeStage(
            5,
            "Approved",
            "✓"
        );


        connectors[5].classList.remove("active");

        connectors[5].classList.add(
            "completed-connector"
        );


        await wait(500);


        /* DEPLOY */

        activateStage(
            6,
            "Deploying"
        );

        connectors[6].classList.add("active");


        pipelineStatus.textContent =
            "Deploying";


        addLog(
            "info",
            "Deploying application to production..."
        );


        await wait(1600);


        addLog(
            "success",
            "Deployment completed successfully."
        );


        completeStage(
            6,
            "Completed",
            "✓"
        );


        connectors[6].classList.remove("active");

        connectors[6].classList.add(
            "completed-connector"
        );


        await wait(500);


        /* PRODUCTION */

        activateStage(
            7,
            "Live"
        );

        connectors[7].classList.add("active");


        pipelineStatus.textContent =
            "Production Live";


        addLog(
            "success",
            "API Service is now running in production."
        );


        await wait(1200);


        completeStage(
            7,
            "Live",
            "✓"
        );


        connectors[7].classList.remove("active");


        pipelineStatus.textContent =
            "Pipeline Successful";


        pipelineStatus
            .closest(".pipeline-status")
            .querySelector(".status-dot")
            .style.background =
            "#22c55e";


        runPipeline.innerHTML = `
            <span>✓</span>
            Pipeline Complete
        `;


        await wait(2000);


        runPipeline.disabled = false;

        runPipeline.innerHTML = `
            <span>▶</span>
            Run Pipeline
        `;

    }
);


/* =========================
   HELPERS
========================= */

function wait(milliseconds) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
    );

}


function activateStage(
    index,
    text
) {

    const stage =
        stages[index];

    stage.classList.remove(
        "pending",
        "completed",
        "failed"
    );

    stage.classList.add("running");

    stage.querySelector(
        ".stage-icon"
    ).textContent = "●";

    stage.querySelector(
        "span"
    ).textContent = text;

}


function completeStage(
    index,
    text,
    icon
) {

    const stage =
        stages[index];

    stage.classList.remove(
        "pending",
        "running",
        "failed"
    );

    stage.classList.add("completed");

    stage.querySelector(
        ".stage-icon"
    ).textContent = icon;

    stage.querySelector(
        "span"
    ).textContent = text;

}


/* =========================
   CLEAR LOGS
========================= */

clearLogs.addEventListener(
    "click",
    () => {

        terminal.innerHTML = `
            <div>
                <span class="info">
                    INFO
                </span>

                Terminal cleared.
            </div>
        `;

    }
);