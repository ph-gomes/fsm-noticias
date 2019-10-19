const Router = require("express").Router();

const User = require("../models/user");

Router.get("/", (req, res) => res.render("login"));
Router.post("/", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const isValid = await user.checkPassword(req.body.password);

  if (isValid) {
    req.session.user = user;
    res.redirect("/admin/noticias");
  } else res.redirect("/login");
});

module.exports = Router;
