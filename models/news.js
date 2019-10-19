const mongoose = require("mongoose");

const NoticiaSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String
});

module.exports = mongoose.model("Noticia", NoticiaSchema);
