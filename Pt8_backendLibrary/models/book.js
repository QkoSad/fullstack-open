const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    required: true,
    unique: true,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [
    {
      type: String,
    },
  ],
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model("Book", schema);
