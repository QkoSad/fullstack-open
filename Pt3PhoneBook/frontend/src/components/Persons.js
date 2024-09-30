import personServices from "../services/persons";

function Persons({ persons, setPersons }) {
  function onDelete(id) {
    personServices
      .remove(id)
      .then(setPersons(persons.filter((pred) => pred.id != id)));
  }
  return (
    <ul>
      {persons.map((person, index) => (
        <li key={index}>
          {person.name} {person.number}{" "}
          <button onClick={() => onDelete(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
}
export default Persons;
