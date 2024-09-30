import { Diagnosis, OccupationalHealthcareEntry } from "../../types";

interface OccupationalEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}
const OccupationalEntry = ({
  entry,
  diagnoses,
}: OccupationalEntryProps): JSX.Element => {
  return (
    <li >
      <div>date: {entry.date}</div>
      <div>description: {entry.description}</div>
      <div>specialist: {entry.specialist}</div>
      <div>employerName: {entry.employerName}</div>
      {"sickLeave" in entry ? (
        <>
          <div>sick leave</div>
          <div>start date:{entry.sickLeave?.startDate}</div>
          <div>end date:{entry.sickLeave?.endDate}</div>
        </>
      ) : null}
      {"diagnosisCodes" in entry ? (
        <ul>
          {entry.diagnosisCodes?.map((diagnosis, inx) => (
            <li key={inx}>
              {diagnosis}:{diagnoses.find((el) => el.code === diagnosis)?.name}
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};
export default OccupationalEntry;
