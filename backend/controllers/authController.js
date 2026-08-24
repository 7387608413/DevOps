const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    createUser,
    findUserByEmail
} = require("../models/userModel");


/* =========================
   REGISTER
========================= */

async function register(req, res) {

    try {

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;


        // Validate fields

        if (
            !firstName ||
            !email ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message: "First name, email and password are required"
            });

        }


        // Check existing user

        const existingUser =
            await findUserByEmail(email);


        if (existingUser) {

            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });

        }


        // Hash password

        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Create user

        const userId =
            await createUser(
                firstName,
                lastName || "",
                email,
                hashedPassword
            );


        return res.status(201).json({

            success: true,

            message: "Registration successful",

            user: {
                id: userId,
                firstName,
                lastName: lastName || "",
                email
            }

        });


    } catch (error) {

        console.error(
            "Register error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Server error during registration"

        });

    }

}


/* =========================
   LOGIN
========================= */

async function login(req, res) {

    try {

        const {
            email,
            password
        } = req.body;


        // Validate

        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required"

            });

        }


        // Find user

        const user =
            await findUserByEmail(email);


        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        // Compare password

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        // Create JWT

        const token =
            jwt.sign(

                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "1d"
                }

            );


        return res.status(200).json({

            success: true,

            message: "Login successful",

            token,

            user: {

                id: user.id,

                firstName:
                    user.first_name,

                lastName:
                    user.last_name,

                email:
                    user.email,

                role:
                    user.role

            }

        });


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Server error during login"

        });

    }

}


module.exports = {
    register,
    login
};