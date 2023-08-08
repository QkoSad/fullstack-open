const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;

console.log("connecting to MongoDB");
mongoose
  .connect(url)
  .then((res) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => console.log("error connecting to MongoDB", err.message));

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3 },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{5,25}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
