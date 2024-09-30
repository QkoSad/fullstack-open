const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("", (request, response) => {
  User.find({}).then((users) => {
    response.json(users);
  });
});
/*
usersRouter.delete("/:id", (request, response) => {
  const id = request.params.id;
  User.findByIdAndDelete(id).then((users) => response.json(users));
});

usersRouter.put("/:id", (request, response) => {
  const id = request.params.id;
  const data = { ...request.body };
  User.findOneAndUpdate({ _id: id }, data).then((result) => {
    response.json(result);
  });
});
*/
usersRouter.post("", async (request, response) => {
  const { username, password, name } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, name });
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (err) {
    response.status(400).send(err._message);
  }
});

module.exports = usersRouter;
