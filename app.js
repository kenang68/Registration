const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./Router/auth.route");
const dashboard = require("./Router/dashboard.route");
const app = express();

//middleware

// view engine setup
app.set("views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Router
app.use('/',dashboard)
app.use('/account/api',router)

// catch 400 and forward to error handler
app.use(function(req, res, next) {
  next(createError(400));
});

// error handler
app.use(function(err, req, res, next) {

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//Server 
app.listen('8000',function(req,res){
    console.log('Serve is up and running at the port 8000')
  })