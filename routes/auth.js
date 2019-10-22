const Router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../models/user");

Router.use(passport.initialize());
Router.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// definindo a estrategia para login local
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (user) {
      if (await user.checkPassword(password)) done(null, user);
      else done(null, false);
    } else done(null, false);
  })
);

Router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    if (!req.session.role) req.session.role = req.user.roles[0];
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
  console.log(req.user);
  if (req.isAuthenticated()) {
    if (req.user.roles.indexOf(req.params.role) >= 0)
      req.session.role = req.params.role;
  }
  res.redirect("/");
});

Router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: false
  })
);

module.exports = Router;
