const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.querySelector(".sidebar");

const responseCanvas =
    document.getElementById("responseChart");

const requestCanvas =
    document.getElementById("requestChart");

const responseValue =
    document.getElementById("responseValue");

const errorValue =
    document.getElementById("errorValue");

const requestValue =
    document.getElementById("requestValue");

const latencyNumber =
    document.getElementById("latencyNumber");

const requestNumber =
    document.getElementById("requestNumber");

const cpuValue =
    document.getElementById("cpuValue");

const memoryValue =
    document.getElementById("memoryValue");

const networkValue =
    document.getElementById("networkValue");

const cpuBar =
    document.getElementById("cpuBar");

const memoryBar =
    document.getElementById("memoryBar");

const networkBar =
    document.getElementById("networkBar");


/* =========================
   MOBILE MENU
========================= */

menuButton.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});


/* =========================
   CANVAS SETUP
========================= */

const responseCtx =
    responseCanvas.getContext("2d");

const requestCtx =
    requestCanvas.getContext("2d");


function resizeCanvas(canvas) {

    const rect =
        canvas.getBoundingClientRect();

    const ratio =
        window.devicePixelRatio || 1;

    canvas.width =
        rect.width * ratio;

    canvas.height =
        rect.height * ratio;

    const ctx =
        canvas.getContext("2d");

    ctx.scale(ratio, ratio);

    return {
        width: rect.width,
        height: rect.height
    };

}


/* =========================
   CHART DATA
========================= */

let responseData = [
    118, 125, 121, 132, 127,
    139, 126, 130, 124, 119,
    128, 134, 122, 117, 125,
    129, 124, 121, 126, 123
];


let requestData = [
    6800, 7200, 7500, 7100,
    7900, 8200, 7800, 8400,
    8100, 8500, 8300, 8600,
    8000, 8400, 8200, 8700,
    8500, 8400, 8426, 8426
];


/* =========================
   DRAW CHART
========================= */

function drawChart(
    canvas,
    data,
    options = {}
) {

    const ctx =
        canvas.getContext("2d");

    const rect =
        canvas.getBoundingClientRect();

    const width =
        rect.width;

    const height =
        rect.height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const padding = 12;

    const max =
        Math.max(...data) * 1.15;

    const min =
        Math.min(...data) * .85;


    /* GRID */

    ctx.strokeStyle =
        "rgba(148,163,184,.07)";

    ctx.lineWidth = 1;


    for (
        let y = padding;
        y < height;
        y += 35
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            width,
            y
        );

        ctx.stroke();

    }


    /* POINTS */

    const points =
        data.map((value, index) => {

            const x =
                padding +
                index *
                (
                    (width - padding * 2) /
                    (data.length - 1)
                );


            const y =
                height -
                padding -
                (
                    (value - min) /
                    (max - min)
                ) *
                (height - padding * 2);


            return {
                x,
                y
            };

        });


    /* AREA */

    ctx.beginPath();

    ctx.moveTo(
        points[0].x,
        height
    );

    points.forEach(point => {

        ctx.lineTo(
            point.x,
            point.y
        );

    });

    ctx.lineTo(
        points[points.length - 1].x,
        height
    );

    ctx.closePath();


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            height
        );

    gradient.addColorStop(
        0,
        "rgba(59,130,246,.20)"
    );

    gradient.addColorStop(
        1,
        "rgba(59,130,246,0)"
    );

    ctx.fillStyle =
        gradient;

    ctx.fill();


    /* LINE */

    ctx.beginPath();

    points.forEach(
        (point, index) => {

            if (index === 0) {

                ctx.moveTo(
                    point.x,
                    point.y
                );

            } else {

                ctx.lineTo(
                    point.x,
                    point.y
                );

            }

        }
    );


    ctx.strokeStyle =
        options.color ||
        "#3b82f6";

    ctx.lineWidth = 2;

    ctx.stroke();


    /* LAST POINT */

    const last =
        points[points.length - 1];


    ctx.beginPath();

    ctx.arc(
        last.x,
        last.y,
        4,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        options.color ||
        "#3b82f6";

    ctx.fill();

}


function redrawCharts() {

    resizeCanvas(responseCanvas);

    resizeCanvas(requestCanvas);

    drawChart(
        responseCanvas,
        responseData,
        {
            color: "#3b82f6"
        }
    );

    drawChart(
        requestCanvas,
        requestData,
        {
            color: "#8b5cf6"
        }
    );

}


redrawCharts();


window.addEventListener(
    "resize",
    redrawCharts
);


/* =========================
   LIVE DATA SIMULATION
========================= */

function randomBetween(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


setInterval(() => {


    /* RESPONSE */

    const newResponse =
        randomBetween(112, 142);

    responseData.push(
        newResponse
    );

    responseData.shift();


    responseValue.textContent =
        newResponse + "ms";

    latencyNumber.textContent =
        newResponse;


    /* REQUESTS */

    const newRequests =
        randomBetween(7800, 9200);

    requestData.push(
        newRequests
    );

    requestData.shift();


    requestValue.textContent =
        newRequests.toLocaleString();

    requestNumber.textContent =
        (newRequests / 1000).toFixed(1) +
        "K";


    /* ERROR RATE */

    const error =
        (
            Math.random() * .12 +
            .05
        ).toFixed(2);


    errorValue.textContent =
        error + "%";


    /* RESOURCES */

    const cpu =
        randomBetween(35, 58);

    const memory =
        randomBetween(37, 48);

    const network =
        randomBetween(50, 70);


    cpuValue.textContent =
        cpu + "%";

    memoryValue.textContent =
        memory + "%";

    networkValue.textContent =
        network + "%";


    cpuBar.style.width =
        cpu + "%";

    memoryBar.style.width =
        memory + "%";

    networkBar.style.width =
        network + "%";


    redrawCharts();


}, 2500);


/* =========================
   SERVICE STATUS
========================= */

const services =
    document.querySelectorAll(
        ".service-health"
    );


setInterval(() => {

    const degraded =
        Math.random() > .75;


    services.forEach(
        service => {

            if (
                service.classList.contains(
                    "warning-health"
                )
            ) {

                if (degraded) {

                    service.innerHTML = `
                        <span></span>
                        Degraded
                    `;

                } else {

                    service.className =
                        "service-health";

                    service.innerHTML = `
                        <span></span>
                        Operational
                    `;

                }

            }

        }
    );

}, 6000);