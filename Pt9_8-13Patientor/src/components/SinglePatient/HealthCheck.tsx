import { HealthCheck } from "../../types";

interface HealthCheckProps {
  entry: HealthCheck;
}
const HealthCheckEntry = ({ entry }: HealthCheckProps): JSX.Element => {
  return (
    <li>
      <div>date: {entry.date}</div>
      <div>description: {entry.description}</div>
      <div>specialist: {entry.specialist}</div>
      {"employerName" in entry ? (
        <div>employer name: {entry.employerName}</div>
      ) : null}
      <div>health check rating: {entry.healthCheckRating}</div>
    </li>
  );
};
export default HealthCheckEntry;
