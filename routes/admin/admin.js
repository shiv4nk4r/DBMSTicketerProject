const router = require("express").Router();
const verify = require("../verifyToken");
const movies = require("../../model/movies");
const User = require("../../model/user");
const Theatre = require("../../model/theatre");
const Show = require("../../model/shows");

router.get("/addMovie", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  if (!user || user.accountType != 0) {
    return res.send("bad request");
  }
  const loginCheck = 1;
  res.render("addMovie", { loginCheck, user });
});

router.get("/addTheatre", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  if (!user || user.accountType != 0) {
    return res.send("bad request");
  }
  const loginCheck = 1;
  res.render("addTheatre", { loginCheck, user });
});

router.get("/selectShowMovie", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  if (!user || user.accountType != 0) {
    return res.send("bad request");
  }
  const loginCheck = 1;
  const movie_data = await movies.find(function (err, document) {
    allMovies = document;
  });
  res.render("selectShowMovie", { allMovies, loginCheck, user });
});

router.get("/selectShowTheatre", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  if (!user || user.accountType != 0) {
    return res.send("bad request");
  }
  const loginCheck = 1;
  const theatre_data = await Theatre.find(function (err, document) {
    console.log(document);
    allTheatre = document;
  });
  res.render("selectShowTheatre", { allTheatre, loginCheck, user });
});

router.get("/addShow", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  if (!user || user.accountType != 0) {
    return res.send("bad request");
  }
  const loginCheck = 1;
  const theatre_data = await Theatre.find(function (err, document) {
    console.log(document);
    allTheatre = document;
  });
  res.render("addShow", { allTheatre, loginCheck, user });
});

router.post("/addShow", async (req, res) => {
  const movieID = req.cookies["showMovieId"];
  const theatreID = req.cookies["showTheatreId"];
  res.clearCookie("showMovieId");
  res.clearCookie("showTheatreId");
  const show = new Show({
    movie_id: movieID,
    theatre_id: theatreID,
    date: req.body.date,
    time: req.body.time,
    seatsavail: req.body.seatsavail,
  });
  try {
    const savedShow = await show.save();
    res.redirect("/admin/selectShowMovie").send({ show: show._id });
  } catch (err) {
    res.status(400);
  }
});

router.post("/savemovieid", (req, res) => {
  temp = req.body.showMovieId;
  res
    .cookie("showMovieId", temp, {
      maxAge: 3600000,
    })
    .send();
  console.log("Cookie");
});

router.post("/savetheatreid", (req, res) => {
  temp = req.body.showTheatreId;
  res
    .cookie("showTheatreId", temp, {
      maxAge: 3600000,
    })
    .send();
});

router.post("/addMovie", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  if (!user || user.accountType != 0) {
    return res.send("bad request");
  }
  console.log(req.body);
  const movie = new movies({
    name: req.body.moviename,
    releasedate: req.body.releasedate,
    director: req.body.director,
    genre: req.body.genre,
    descritpion: req.body.description,
    Rating: req.body.rating,
  });
  try {
    const savedMovie = await movie.save();
    res.redirect("/admin/addMovie").send({ movie: movie._id });
  } catch (err) {
    res.status(400);
  }
  return;
});

router.post("/addTheatre", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  if (!user || user.accountType != 0) {
    return res.send("bad request");
  }
  const theatre = new Theatre({
    name: req.body.name,
    location: req.body.location,
  });
  try {
    const savedTheatre = await theatre.save();
    res.redirect("/admin/addTheatre").send({ theatre: theatre._id });
  } catch (err) {
    res.status(400);
  }
  return;
});

module.exports = router;
