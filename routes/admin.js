const Router = require("express").Router();

const News = require("../models/news");

Router.use((req, res, next) => {
  if ("user" in req.session) return next();
  else res.redirect("/login");
});

Router.get("/", (req, res) =>
  res.send("Área Administrativa - Acesso Restrito")
);
Router.get("/noticias", async (req, res) => {
  const conditions = { category: "private" };
  const news = await News.find(conditions);
  res.render("news/admin", { news });
});

module.exports = Router;
