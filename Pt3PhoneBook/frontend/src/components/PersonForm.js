import { useState } from "react";
import personServices from "../services/persons";

function PersonForm({ persons, setPersons, displayMessage }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  function onAddPerson(e) {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const id = persons.find((el) => el.name === newName)?.id;
    if (id) {
      personServices
        .update(id, newPerson)
        .then(() => {
          setPersons(
            persons.map((person) => (person.id !== id ? person : newPerson))
          );
          displayMessage("Number changed");
        })
        .catch((err) => {
          console.error(err.message);
          displayMessage("Number has already been removed", "error");
        });
    } else {
      personServices
        .create(newPerson)
        .then(() => {
          setPersons([...persons, newPerson]);
          displayMessage("Person Added");
        })
        .catch((error) => {
          console.log(error.response.data)
          displayMessage('Validation Error', "error");
        });
    }
    setNewName("");
    setNewNumber("");
  }

  return (
    <form onSubmit={onAddPerson}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
export default PersonForm;
