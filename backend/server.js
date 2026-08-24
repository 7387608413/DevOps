require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();


/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());


/* =========================
   ROUTES
========================= */

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "DevGuard Backend API is running"
    });

});


app.use(
    "/api/auth",
    authRoutes
);


/* =========================
   SERVER
========================= */

const PORT =
    process.env.PORT || 5000;


async function startServer() {

    try {

        await connectDB();

        app.listen(
            PORT,
            () => {

                console.log(
                    `🚀 DevGuard backend running on port ${PORT}`
                );

                console.log(
                    `🔐 Auth API: http://localhost:${PORT}/api/auth`
                );

            }
        );

    } catch (error) {

        console.error(
            "❌ Failed to start server:",
            error.message
        );

    }

}


startServer();