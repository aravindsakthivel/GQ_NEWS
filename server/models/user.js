const { Schema, model } = require("mongoose");
const validator = require("validator")

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'invalid email']
  },
});

const User = model("User", userSchema);
module.exports = { User };
