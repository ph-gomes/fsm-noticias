const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  facebookId: String,
  googleId: String,
  name: String,
  roles: {
    type: [String],
    enum: ["restrito", "admin"],
    required: true
  }
});

/**
 * Preprocessamento anterior à ação de salvar
 */

UserSchema.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) next();
  user.is;
  bcrypt.genSalt((err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.checkPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) reject();
      else resolve(isMatch);
    });
  });
};

module.exports = mongoose.model("User", UserSchema);
