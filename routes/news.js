const Router = require("express").Router();

const News = require("../models/news");

Router.get("/", async (req, res) => {
  const conditions = { category: "public" };
  const news = await News.find(conditions);
  res.render("news/index", { news });
});

module.exports = Router;
