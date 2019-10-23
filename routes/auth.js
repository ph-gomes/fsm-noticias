const Router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const FacebookStrategy = require("passport-facebook");

const User = require("../models/user");

Router.use(passport.initialize());
Router.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

/** Definindo a estrategia para login com o FB */
passport.use(
  new FacebookStrategy(
    {
      clientID: "1165285843675125",
      clientSecret: "1842d4875867c182a3801ce8b76e62d2",
      callbackURL: "http://localhost:3000/facebook/callback",
      profileFields: ["id", "displayName", "email", "photos"]
    },
    async (accessToken, refreshToken, profile, done) => {
      const userDB = await User.findOne({ facebookId: profile.id });
      if (!userDB) {
        const user = new User({
          name: profile.displayName,
          facebookId: profile.id,
          roles: ["restrito"]
        });
        await user.save();
        done(null, user);
      } else done(null, userDB);
    }
  )
);

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
  if (req.isAuthenticated()) {
    if (req.user.roles.indexOf(req.params.role) >= 0)
      req.session.role = req.params.role;
  }
  res.redirect("/");
});
Router.get("/facebook", passport.authenticate("facebook"));
Router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => res.redirect("/")
);

Router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: false
  })
);

module.exports = Router;
