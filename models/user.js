const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
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
