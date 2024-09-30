import express from "express";
import diagnoses from "../data/diagnoses";
import {
  addPatient,
  addEntry,
  getPatient,
  getAllPatients,
} from "./services/patients";
import { toNewPatient,toNewEntry } from "./utils";

const app = express();

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});
app.get("/api/diagnoses", (_req, res) => {
  res.json(diagnoses);
});
app.get("/api/patients", (_req, res) => {
  res.json(getAllPatients());
});
app.get("/api/patients/:id", (req, res) => {
  res.json(getPatient(req.params.id));
});
app.post("/api/patients/:id/entries", (req, res) => {
  const newEntry = toNewEntry(req.body);
  res.json(addEntry(newEntry, req.params.id));
});
app.post("/api/patients", (req, res) => {
  const newPatient = toNewPatient(req.body);
  res.json(addPatient(newPatient));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at port${PORT}`);
});
