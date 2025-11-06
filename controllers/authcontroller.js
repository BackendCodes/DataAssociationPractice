const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  

  // basic validation
  if (!email || !password) {
    console.log("all fields are required");
    return res.redirect("/register");
  }

  try {
    // check existing user
    const existinguser = await userModel.findOne({ email });
    if (!existinguser) {
      console.log("invalid username or password");
      return res.redirect("/login");
    }

    // check password
    const isMatch = await bcrypt.compare(password, existinguser.password);
    
    if (!isMatch) {
      console.log("invalid username or password");
      return res.redirect("/login");
    }

    const token = jwt.sign({ id: existinguser._id }, "lordsainathisgreat", {
      expiresIn: "300s",
    });
 

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 5 * 60 * 1000, // 5 minutes
    });

    return res.redirect("/create");
  } catch (error) {
    console.log(error.message);
    return res.redirect("/");
  }
};

const register = async (req, res) => {
  const { fname, email, password } = req.body;

  // basic validation
  if (!fname || !email || !password) {
    console.log("all fields are required");
    return res.redirect("/register");
  }

  try {
    // check existing user
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      console.log("existing user");
      return res.redirect("/login");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createduser = await userModel.create({
      name: fname,
      email,
      password: hash,
    });

    const token = jwt.sign({ id: createduser._id }, "lordsainathisgreat", {
      expiresIn: "300s",
    });
   

    res.cookie("token", token, {
      httpOnlye: true,
      secure: false,
      maxAge: 5 * 60 * 1000, // 5 minutes
    });

    return res.redirect("/create");
  } catch (error) {
    console.log(error.message);
    return res.redirect("/");
  }
};

const logout = async (req, res) => {
  res.clearCookie('token');
  return res.redirect("/");
};

module.exports = { login, register, logout };
