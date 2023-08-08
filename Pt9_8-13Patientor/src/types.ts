export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  diagnosisCodes: string[];
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  diagnosisCodes?: string[];
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}
export interface HealthCheck extends BaseEntry {
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
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id">;
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
export type EntryFormValues = UnionOmit<Entry, "id">;
