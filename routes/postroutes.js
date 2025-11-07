const express = require("express");
const createPost = require("../controllers/postcontroller");
const protectroute = require("../middlewares/protectroute");
const postroutes = express.Router();
const multerconfig = require("../config/multer");
const userModel = require("../models/userModel");

postroutes.post("/create", protectroute, createPost);
postroutes.post(
  "/upload",
  protectroute,
  multerconfig.single("userimg"),
  async (req, res) => {
    if (!req.file) {
      return res.redirect("/allpostsuser");
    }
    const { userid } = req.user;
    const user = await userModel.findById(userid);
    user.profilepic = req.file.filename;
    await user.save();
    console.log("file uploaded");

    res.redirect("/allpostsuser");
  }
);

module.exports = postroutes;
