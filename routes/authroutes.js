const express = require("express");
const { register, login, logout } = require("../controllers/authcontroller");

const { default: rateLimit } = require("express-rate-limit");
const authroutes = express.Router();


const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // limit each IP to 3 requests per windowMs
    message: "Too many login attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});

const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 registration attempts per windowMs
    message: "Too many registration attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});

authroutes.post("/login", loginLimiter, login);
authroutes.post("/register", registerLimiter, register);
authroutes.get("/logout", logout);

module.exports = authroutes;
