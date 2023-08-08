import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import { useState, useEffect } from "react";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  useEffect(() => {
    personServices.getAll().then((response) => setPersons(response.data));
  }, []);

  function displayMessage(message, type = "normal") {
    setMessage({message,type});
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter persons={persons} filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        displayMessage={displayMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons.filter((el) =>
          el.name.toLowerCase().includes(filter.toLowerCase())
        )}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
