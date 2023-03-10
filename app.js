var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var app = express();
require("dotenv").config();
const { connectionDB } = require("./db/connect");
const paintRouter = require("./controllers/PaintManage/index");
const materialRouter = require("./controllers/MaterialManage/index");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/products/paint", paintRouter);
app.use("/products/material", materialRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const connectionDb = async () => {
  try {
    await connectionDB(process.env.MONGO_URL);
    console.log("Database connect successfully !!");
  } catch (error) {
    console.log(error);
  }
};
connectionDb();
app.listen(9000);
module.exports = app;
