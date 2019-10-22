const Router = require("express").Router();

const User = require("../models/user");

Router.use((req, res, next) => {
  if ("user" in req.session) {
    res.locals.user = req.session.user;
    res.locals.role = req.session.role;
  }
  next();
});

Router.get("/login", (req, res) => res.render("login"));
Router.get("/logout", async (req, res) => {
  await req.session.destroy();
  res.redirect("/");
});
Router.get("/change-role/:role", async (req, res) => {
  if ("user" in req.session) {
    if (req.session.user.roles.indexOf(req.params.role) >= 0)
      req.session.role = req.params.role;
  }
  res.redirect("/");
});

Router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    const isValid = await user.checkPassword(req.body.password);
    if (isValid) {
      req.session.user = user;
      req.session.role = user.roles[0];
      res.redirect("/restrict/noticias");
    }
  } else res.redirect("/login");
});

module.exports = Router;
