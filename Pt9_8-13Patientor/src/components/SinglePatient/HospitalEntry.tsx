import { Diagnosis, HospitalEntry } from "../../types";

interface HospitalEntryProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}
const HospitalEntryElement = ({ entry, diagnoses }: HospitalEntryProps): JSX.Element => {
  return (
      <li>
        <div>date: {entry.date}</div>
        <div>description: {entry.description}</div>
        <div>specialist: {entry.specialist}</div>
        <div>
          discharge
          <div>date {entry.discharge.date}</div>
          <div>criteria {entry.discharge.criteria}</div>
        </div>
        {"diagnosisCodes" in entry ? (
          <ul>
            {entry.diagnosisCodes?.map((diagnosis, inx) => (
              <li key={inx}>
                {diagnosis}:
                {diagnoses.find((el) => el.code === diagnosis)?.name}
              </li>
            ))}
          </ul>
        ) : null}
      </li>
  );
};
export default HospitalEntryElement;
