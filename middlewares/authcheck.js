const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authcheck = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("token:", token);

  if (!token) {
    return next();
  }

  try {
    const verifytoken = jwt.verify(token, "lordsainathisgreat");

    const user = await userModel.findById(verifytoken.id).select("-password");
    console.log(user);
    if (user) {
      console.log(user);
      return res.redirect("/create");
    }

    return next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    res.clearCookie("token");
    return next();
  }
};

module.exports = authcheck;
