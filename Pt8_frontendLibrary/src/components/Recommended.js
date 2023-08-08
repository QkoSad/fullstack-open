import { useQuery } from "@apollo/client";
import { BOOKS_BY_GENRE } from "../queries";

const Recommended = ({ user }) => {
  const booksRes = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: user.me.favoriteGenre },
  });
  if (booksRes.loading) return <>loading ....</>
  return (
    <>
      <h2>recommendations</h2>
      <div>books in your favotite genre</div>
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
    </>
  );
};
export default Recommended;
