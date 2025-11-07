const dotenv = require("dotenv");
dotenv.config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var multer = require('multer');
const rateLimit = require("express-rate-limit");




var indexRouter = require("./routes/index");
const connectDB = require("./config/db");
const authroutes = require("./routes/authroutes");
const { logout } = require("./controllers/authcontroller");
const postroutes = require("./routes/postroutes");
const helmet = require("helmet");


var app = express();



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

// Use full helmet middleware for comprehensive security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://cdn.jsdelivr.net", // ✅ allow Tailwind CDN
      ],
      styleSrc: [
        "'self'",
        "https://cdn.jsdelivr.net", // ✅ allow Tailwind inline styles
        "'unsafe-inline'", // (optional if you use inline <style> tags)
      ],
    },
  },
}));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

connectDB();





app.use("/", indexRouter);



app.use("/api/auth", authroutes);
app.use('/api/post',postroutes);


module.exports = app;
