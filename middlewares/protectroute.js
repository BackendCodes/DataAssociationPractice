const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const protectroute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.log("token expired or invalid");
      return res.redirect("/login");
    }

    const verifytoken = jwt.verify(token, "lordsainathisgreat");

    if (!verifytoken) {
      return res.redirect("/login");
    }
    
    const user = await userModel.findById(verifytoken.id);

    req.user = { userid: verifytoken.id, name: user.name };

    next();
  } catch (error) {
    console.log(error.message);
    return res.redirect("/");
  }
};

module.exports = protectroute;
