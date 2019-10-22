const Router = require("express").Router();

const User = require("../models/user");

Router.use((req, res, next) => {
  if ("user" in req.session) {
    res.locals.user = req.session.user;
  }
  next();
});

Router.get("/login", (req, res) => res.render("login"));
Router.get("/logout", async (req, res) => {
  await req.session.destroy();
  res.redirect("/");
});

Router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    const isValid = await user.checkPassword(req.body.password);
    if (isValid) {
      req.session.user = user;
      res.redirect("/restrict/noticias");
    }
  } else res.redirect("/login");
});

module.exports = Router;
