const router = require("express").Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");

//RENDER REGISTER PAGE
router.get("/register", (req, res) => {
  loginCheck = 0;
  let user;
  res.render("register", { loginCheck, user });
});

//RENDER LOGIN PAGE
router.get("/login", (req, res) => {
  loginCheck = 0;
  let user;
  res.render("login", { loginCheck, user });
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth-token");
  res.redirect("/");
});

//BACKEND
router.post("/register", async (req, res) => {
  //LETS VALIDATE before we create a user
  console.log(req.body);
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the email already exist or not
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  //HASH PASSWORDS
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Creating User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    accountType: req.body.accounttype,
  });
  try {
    const savedUser = await user.save();
    res.redirect("/").send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/regadmin", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("admin1234", salt);

  //Creating User
  const user = new User({
    name: "Admin",
    email: "admin@admin.com",
    password: hashedPassword,
    accountType: 0,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  //LETS VALIDATE before we Login
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the email already exist or not
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  //If PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password is not valid");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res
    .cookie("auth-token", token, {
      maxAge: 3600000,
    })
    .redirect("/");
});

module.exports = router;
