import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BIRTHYEAR } from "../queries";

const Authors = ({ authors }) => {
  const [addBirthyear] = useMutation(ADD_BIRTHYEAR);
  const [year, setYear] = useState("");
  const [name, setName] = useState("");

  const setBirthyear = (e) => {
    e.preventDefault();
    addBirthyear({ variables: { birthyear: parseInt(year), name } });
    setYear("");
    setName("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={setBirthyear}>
        <label>name</label>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          {authors.map((author) => (
            <option value={author.name} key={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <label>birthyear</label>
        <input value={year} onChange={(e) => setYear(e.target.value)} />
        <br />
        <button>set</button>
      </form>
    </div>
  );
};

export default Authors;
