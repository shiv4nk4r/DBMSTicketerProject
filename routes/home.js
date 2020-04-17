const router = require("express").Router();
const Movies = require("../model/movies");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  let allMovies = [];
  let loginCheck = 0;
  let user;
  let userid;
  const token = req.cookies["auth-token"];
  if (token) {
    loginCheck = 1;
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      userid = verified;
      user = await User.findOne({ _id: userid });
    } catch (err) {
      res.status(400).send("Invalid Token");
    }
  }
  const movie_data = await Movies.find(function (err, document) {
    allMovies = document;
  });
  res.clearCookie("moviebookingid");
  res.render("welcome", { allMovies, loginCheck, user });
});

module.exports = router;
