const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("./config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer "))
    req.token = authorization.replace("Bearer ", "");
  next();
};

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, config.SECRET);

  if (!decodedToken.id) return res.status(401).json({ error: "invalid token" });

  const user = await User.findById(decodedToken.id);
  console.log('user from the middleware',user)
  req.user = user;
  next();
};
module.exports = { tokenExtractor, userExtractor };
