import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    console.log("damn");
    res.status(400).json({ error: "wrong data" });
  }
  const message = calculateBmi(Number(height), Number(weight));
  res.json({
    weight,
    height,
    bmi: message,
  });
});

app.post("/exercises", (req, res) => {
  let { daily_exercises, target } = req.body;
  daily_exercises = JSON.parse(daily_exercises);
  target = JSON.parse(target);
  if (!(daily_exercises instanceof Array)) res.json({ error: "bad request" });
  else {
    console.log(typeof daily_exercises)
    console.log(typeof target)
    const result = calculateExercise(daily_exercises, target);

    res.json(result);
  }
});

app.listen(3003, () => console.log(`Server running at port 3003`));
