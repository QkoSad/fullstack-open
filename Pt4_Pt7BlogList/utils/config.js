require("dotenv").config();

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = {
  SECRET:process.env.SECRET,
  MONGODB_URI,
  PORT: process.env.PORT,
};
