import { useState } from "react";
import patientService from "../../services/patients";

const EntryForm = (): JSX.Element => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [employerName, setEmployerName] = useState<string>("");

  const addEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry = {
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      employerName,
      type: "HealthCheck" as const,
    };

    patientService.createEntry(newEntry);

    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setEmployerName("");
  };

  return (
    <>
      <div>New HealthCheck entry</div>
      <form onSubmit={addEntry}>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Date
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Specialist
          <input
            type="text"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </label>
        <label>
          HealthCheck rating
          <input
            type="text"
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(e.target.value)}
          />
        </label>
        <label>
          Employer name
          <input
            type="text"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
        </label>
        <button>Add</button>
      </form>
    </>
  );
};

export default EntryForm;
