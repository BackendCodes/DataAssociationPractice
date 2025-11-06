const express = require('express');
const createPost = require('../controllers/postcontroller');
const protectroute = require('../middlewares/protectroute');
const postroutes = express.Router();

postroutes.post("/create",protectroute,createPost)



module.exports = postroutes;