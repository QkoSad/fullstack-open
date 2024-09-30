require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

const errorHandler = (error, req, res, next) => {
  console.log(err.message);
  if (err.name === "CastError")
    return res.status(404).send({ error: "malformatted id" });
  else if (err.name === "ValidationError")
    return res.status(400).json({ error: err.message });
  next(err);
};

morgan.token("type", function (req, res) {
  return String(JSON.stringify(req.body));
});
// middleware to deal with same origin
app.use(cors());
// middleware to allow express to deliver html
// it is unclear to me why i cant just make a get method that deals with that
app.use(express.static("build"));
// transfprms it to jsontransfprms it to json
app.use(express.json());
// adding additional information on request
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :type")
);
app.use(errorHandler);

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((err) => next(err));
});
/* currently not used
const date = new Date();
app.get("/api/info", (req, res) => {
  res.send(`Phonebook has info for ${data.length} persons <br />${date}`);
});
*/
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch((err) => next(err));
});
app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  const person = new Person({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000),
  });
  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => next(err));
});
app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;
  Person.findOneAndUpdate(
    { id: req.params.id },
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      console.log("result:", result);
      res.status(204).end();
    })
    .catch((err) => next(err));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
