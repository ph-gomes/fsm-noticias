const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");

const User = require("./models/user");

const app = express();

/** Variáveis de ambiente. */
const port = process.env.PORT || 3000;
const mongo = process.env.MONGODB || "mongodb://localhost/noticias";

/**  Configuração dos middlewares. */
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "MySecretC0d3!",
    name: "sessionId"
  })
);

/** Valores de configurações do express. */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

/** Cria usuário inicial */
const createInitialUser = async () => {
  const total = User.countDocuments({ username: "admin" });
  if (total === 0) {
    const user = new User({
      username: "admin",
      password: "MyPass123"
    });

    await user.save();
    console.log("Admin user created.");
  } else console.log("Admin user already exists.");
};

/** Conecta ao banco e inicia o servidor. */
mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    createInitialUser();
    app.listen(port, _ => console.log(`Listening to port ${port}`));
  })
  .catch(e => console.log(e));
