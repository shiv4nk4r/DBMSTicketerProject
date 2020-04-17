const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/user");

router.get("/", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  if (user) {
    return res.send("user found as: " + user.name);
  }
});

module.exports = router;
