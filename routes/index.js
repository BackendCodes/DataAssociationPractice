var express = require("express");
const postModel = require("../models/postModel");

const protectroute = require("../middlewares/protectroute");
const authcheck = require("../middlewares/authcheck");
const { logout } = require("../controllers/authcontroller");
var router = express.Router();

/* GET home page. */
router.get("/", authcheck, function (req, res, next) {
  res.render("index");
});

router.get("/login", authcheck, (req, res) => {
  res.render("login");
});

router.get("/register", authcheck, (req, res) => {
  res.render("register");
});

router.get("/create", protectroute, (req, res) => {
  let { name, userid } = req.user;
  name = name.split(" ")[0];
  res.render("create", { userid: userid, name: name });
});
router.get("/allpostsuser", protectroute, async (req, res) => {
  try {
    const { userid, name } = req.user;

    const allpost = await postModel.find({
      user: userid,
    });

    res.render("allpostsuser", { allpost, name });
  } catch (error) {
    res.json({
      message: "enable to get all posts",
    });
  }
});

router.get("/logout", logout);

module.exports = router;
