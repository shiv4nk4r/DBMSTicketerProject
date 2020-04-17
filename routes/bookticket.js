const router = require("express").Router();
const Movies = require("../model/movies");
const verify = require("./verifyToken");

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
      res.status(400).send("Invalid Token");
    }
  }
  let cookieid = req.cookies["moviebookingid"];
  const movie = await Movies.findOne({ _id: cookieid });
  res.render("bookTicket", { loginCheck, user, movie });
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
