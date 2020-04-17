const router = require("express").Router();
const verify = require("../verifyToken");
const movies = require("../../model/movies");
const User = require("../../model/user");

router.get("/", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  if (!user || user.accountType != 0) {
    return res.send("bad request");
  }
  res.render("addMovie");
});

router.post("/", verify, async (req, res) => {
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
    res.send({ movie: movie._id });
  } catch (err) {
    res.status(400).send(err);
  }
  return;
});

module.exports = router;
