import patients from "../../data/patients";
import { Patient, NewPatient, NonSensitivePatient, Entry } from "../types";
import { v1 as uuid } from "uuid";

export const getAllPatients = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    };
  });

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuid() };
  patients.push(newPatient);
  return newPatient;
};

export const getPatient = (id: string): NonSensitivePatient => {
  const patient = patients.find((el) => el.id === id);
  if (patient)
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: patient.entries,
    };
  throw new Error("patient not found");
};

export const addEntry = (entry:Omit<Entry,'id'>, id: string): NonSensitivePatient => {
  const patient = patients.find((el) => el.id === id);
  if (patient) {
    const newEntry = {...entry,id:uuid()} as Entry
    const entries = patient.entries.concat(newEntry);
    const updatedPatient = { ...patient, entries };
    return {
      id: updatedPatient.id,
      name: updatedPatient.name,
      dateOfBirth: updatedPatient.dateOfBirth,
      gender: updatedPatient.gender,
      occupation: updatedPatient.occupation,
      entries: updatedPatient.entries,
    };
  }
  throw new Error("patient not found");
};
