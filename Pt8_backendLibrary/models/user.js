const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    required: true,
    unique: true,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);
