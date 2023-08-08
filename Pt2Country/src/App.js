import axios from "axios";
import { useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  useState(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data))
      .catch((err) => console.log(err));
  }, []);
  const countriesDisplay = countries.filter((el, index) =>
    el.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div>Find Countries</div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {countriesDisplay.length > 10 ? (
          "too many countries"
        ) : countriesDisplay.length > 1 ? (
          countriesDisplay.map((el, index) => (
            <li key={index}>{el.name.common}</li>
          ))
        ) : countriesDisplay.length === 1 ? (
          <>
            <li key={2}>
              <h3>{countriesDisplay[0]?.name.official}</h3>
            </li>
            <li key={1}>catial{countriesDisplay[0]?.capital[0]}</li>
            <li key={2}>languages</li>
          </>
        ) : null}
      </ul>
    </>
  );
}

export default App;
