export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  diagnosisCodes: string[];
  discharge: {
    date: string;
    criteria: string;
  };
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  diagnosisCodes?: string[];
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}
interface HealthCheck extends BaseEntry {
  type: "HealthCheck";
  employerName?: string;
  healthCheckRating: number;
}
interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
}
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheck;

export interface Patient {
  id: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  name: string;
  ssn: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
