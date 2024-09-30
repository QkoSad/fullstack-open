import { useState } from "react";
import { useQuery } from "@apollo/client";
import { BOOKS_BY_GENRE } from "../queries";

const Books = ({ books }) => {
  const genres = ["all", "refactoring", "agile", "design", "crime", "classic"];
  const [filter, setFilter] = useState('');
  const booksRes = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: filter },
  });
  if (booksRes.loading) return <>loading ....</>;
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksRes.data.books.map((a, index) => (
            <tr key={index}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        {genres.map((genre, index) => {
          if (genre === "all")
            return (
              <option value={''} key={index}>
                {genre}
              </option>
            );
          return (
            <option value={genre} key={index}>
              {genre}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Books;
