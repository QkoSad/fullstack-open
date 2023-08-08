import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";
import HealthCheckEntry from "./HealthCheck";
import EntryForm from "./EntryForm";

interface SinglePatientProps {
  patients: Patient[];
  diagnoses: Diagnosis[];
}
const SinglePatient = ({
  patients,
  diagnoses,
}: SinglePatientProps): JSX.Element => {
  const { id } = useParams();
  const patient = patients.find((el) => el.id === id);
  if (!patient) return <></>;
  return (
    <>
      <h3>{patient.name}</h3>
      <div>gender: {patient.gender}</div>
      {patient.ssn ? <div>ssn: {patient.ssn}</div> : null}
      {patient.dateOfBirth ? (
        <div>date of birth: {patient.dateOfBirth}</div>
      ) : null}
      <div>ocupation: {patient.occupation}</div>
      <EntryForm />
      <div>entries</div>
      <ul>
        {patient.entries.map((entry) => {
          switch (entry.type) {
            case "Hospital":
              return (
                <HospitalEntry
                  entry={entry}
                  diagnoses={diagnoses}
                  key={entry.id}
                />
              );
            case "OccupationalHealthcare":
              return (
                <OccupationalEntry
                  entry={entry}
                  diagnoses={diagnoses}
                  key={entry.id}
                />
              );
            case "HealthCheck":
              return <HealthCheckEntry entry={entry} key={entry.id} />;
            default:
              const _exhaustiveCheck: never = entry;
              return _exhaustiveCheck;
          }
        })}
      </ul>
    </>
  );
};

export default SinglePatient;
