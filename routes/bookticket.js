const router = require("express").Router();
const Shows = require("../model/shows");
const verify = require("./verifyToken");
const Theatre = require("../model/theatre");

router.get("/", async (req, res) => {
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
      res.status(400);
    }
  }
  let cookieid = await req.cookies["moviebookingid"];
  const shows = await Shows.find({ movie_id: cookieid });
  const theatres = await Theatre.find();
  res.render("bookTicket", { loginCheck, user, shows, theatres });
});

router.post("/savemovieid", (req, res) => {
  temp = req.body.request_data;
  res
    .cookie("moviebookingid", temp, {
      maxAge: 3600000,
    })
    .send();
});

module.exports = router;
