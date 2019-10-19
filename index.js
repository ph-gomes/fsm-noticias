const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");

const User = require("./models/user");

const news = require("./routes/news");
const admin = require("./routes/admin");
const auth = require("./routes/auth");
const pages = require("./routes/pages");

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
    name: "sessionId",
    resave: false,
    saveUninitialized: false
  })
);

app.use("/", auth);
app.use("/", pages);
app.use("/admin", admin);
app.use("/noticias", news);

/** Valores de configurações do express. */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** Cria usuário inicial */
const createInitialUser = async () => {
  const total = await User.countDocuments({ username: "admin" });
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
