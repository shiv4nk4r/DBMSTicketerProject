const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

const authRoute = require("./routes/auth");
const homeRoute = require("./routes/home");
const postRoute = require("./routes/post");
const admin = require("./routes/admin/admin");
const bookMovie = require("./routes/bookticket");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

app.use(express.urlencoded());
app.use(cookieParser());

app.use("/user", authRoute);
app.use("/posts", postRoute);
app.use("/", homeRoute);
app.use("/admin", admin);
app.use("/bookticket", bookMovie);

app.listen(3000, () => console.log("Server is running"));
