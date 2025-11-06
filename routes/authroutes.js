const express = require("express");
const { register, login, logout } = require("../controllers/authcontroller");
const authmiddleware = require("../middlewares/protectroute");
const authcheck = require("../middlewares/authcheck");
const authroutes = express.Router();

authroutes.post("/login",login);
authroutes.post("/register",register);
authroutes.get("/logout", logout);

module.exports = authroutes;
