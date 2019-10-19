const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const mongo = process.env.MONGODB || "mongodb://localhost/noticias";

mongoose.Promise = global.Promise;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "MySecretC0d3!",
    name: "sessionId"
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, _ => console.log(`Listening to port ${port}`));
  })
  .catch(e => console.log(e));

/**
 * Teste do model
 */

const User = require("./models/user");
const user = new User({
  username: "TestUser",
  password: "abc123"
});

user.save(() => console.log("Save"));
