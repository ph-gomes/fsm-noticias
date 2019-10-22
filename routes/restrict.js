const Router = require("express").Router();

const News = require("../models/news");

Router.use((req, res, next) => {
  if ("user" in req.session) {
    if (req.session.user.roles.indexOf("restrito") >= 0) return next();
    else res.redirect("/");
  } else res.redirect("/login");
});

Router.get("/", (req, res) => res.send("Área Restrita - Acesso Restrito"));
Router.get("/noticias", async (req, res) => {
  const conditions = { category: "private" };
  const news = await News.find(conditions);
  res.render("news/restrict", { news });
});

module.exports = Router;
