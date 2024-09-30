const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
    unique: true,
  },
  born: {
    type: Number,
  },
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Author", schema);
