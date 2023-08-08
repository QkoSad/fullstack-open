import { Entry, Gender, NewPatient } from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object")
    throw new Error("Incorrect or request body");
  if (
    "name" in object &&
    "gender" in object &&
    "dateOfBirth" in object &&
    "occupation" in object &&
    "ssn" in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name, "Incorrect or missing name"),
      gender: parseGender(object.gender),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseString(object.occupation, "Incorrect or missing ssn"),
      ssn: parseString(object.name, "Incorrect or missing ssn"),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data some fields are missing");
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error("Incorrect or missing date");
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender))
    throw new Error("Incorrect or missing gender");
  return gender;
};

const parseNumber = (number: unknown, message: string): number => {
  if (!number || !isNumber(number)) throw new Error(message);
  return number;
};

const parseString = (name: unknown, message: string): string => {
  if (!name || !isString(name)) throw new Error(message);
  return name;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export const toNewEntry = (object: unknown): UnionOmit<Entry, "id"> => {
  if (!object || typeof object !== "object") throw new Error("incorrect body");
  if (
    "date" in object &&
    "specialist" in object &&
    "description" in object &&
    "type" in object
  ) {
    console.log(object.type)
    switch (object.type) {
      case "Hospital":
        if (
          "diagnosisCodes" in object &&
          "discharge" in object &&
          typeof object.discharge === "object" &&
          object.discharge !== null &&
          "date" in object.discharge &&
          "criteria" in object.discharge
        ) {
          let diagnosisCodes = undefined;
          if (isDiagnosisCodes(object.diagnosisCodes))
            diagnosisCodes = [...object.diagnosisCodes];
          else throw new Error("error in diagnoses codes");
          return {
            date: parseString(object.date, "Incorrect date"),
            specialist: parseString(object.specialist, "Incorrect specialist"),
            description: parseString(
              object.description,
              "Incorrect description"
            ),
            type: object.type,
            discharge: {
              date: parseString(object.discharge.date, "error in discharge date"),
              criteria: parseString(object.discharge.criteria, "error in discharge criteria"),
            },
            diagnosisCodes,
          };
        }
        throw new Error(
          "diagnosisCodes or discharge missing for type Hospital"
        );
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          let employerName = undefined;
          if ("employerName" in object && employerName !== "undefined")
            employerName = object.employerName;
          return {
            date: parseString(object.date, "Incorrect date"),
            specialist: parseString(object.specialist, "Incorrect specialist"),
            description: parseString(
              object.description,
              "Incorrect description"
            ),
            type: object.type,
            healthCheckRating: parseNumber(
              object.healthCheckRating,
              "Incorrect HealthCheckRating"
            ),
            employerName: parseString(employerName, "Incorrect employername"),
          };
        }
        throw new Error("healthCheckRating missing for type HealthCheck");

      case "OccupationalHealthcare":
        if ("employerName" in object) {
          let diagnosisCodes: undefined | string[] = undefined;
          let sickLeave: undefined | { startDate: string; endDate: string } =
            undefined;
          if (
            "diagnosisCodes" in object &&
            object.diagnosisCodes !== undefined
          ) {
            diagnosisCodes = isDiagnosisCodes(object.diagnosisCodes)
              ? object.diagnosisCodes
              : undefined;
          }
          if (
            "sickLeave" in object &&
            object.sickLeave !== undefined &&
            object.sickLeave !== null &&
            typeof object.sickLeave === "object" &&
            "startDate" in object.sickLeave &&
            "endDate" in object.sickLeave
          ) {
            sickLeave = {
              startDate: parseString(object.sickLeave.startDate, ""),
              endDate: parseString(object.sickLeave.endDate, ""),
            };
          }
          return {
            date: parseString(object.date, "Incorrect date"),
            specialist: parseString(object.specialist, "Incorrect specialist"),
            description: parseString(
              object.description,
              "Incorrect description"
            ),
            type: object.type,
            ...(isDiagnosisCodes(diagnosisCodes) && {diagnosisCodes}),
            //diagnosisCodes,
            employerName: parseString(
              object.employerName,
              "Incorrect employername"
            ),
            sickLeave,
          };
        }
        throw new Error("employerName missing in OccupationalHealthcare");
      default:
        throw new Error("wrong type");
    }
  }
  throw new Error("erro");
};

const isDiagnosisCodes = (
  diagnosisCodes: unknown
): diagnosisCodes is string[] => {
  if (diagnosisCodes instanceof Array) {
    diagnosisCodes.forEach((el) => {
      if (typeof el === "string") throw new Error("");
    });
    return true;
  }
  return false;
};
