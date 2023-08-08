import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, ME } from "./queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommended from "./components/Recommended";

const App = () => {
  const [token, setToken] = useState(null);
  const authorsRes = useQuery(ALL_AUTHORS);
  const booksRes = useQuery(ALL_BOOKS);
  const userRes = useQuery(ME);
  const client = useApolloClient();

  useEffect(() => {
    if (localStorage.getItem("library-user-token"))
      setToken(localStorage.getItem("library-user-token"));
  }, [setToken]);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data);
    },
  });

  const logOut = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    client.resetStore();
  };

  if (authorsRes.loading || booksRes.loading) return <div>loading...</div>;

  if (!token) {
    return <Login token={token} setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <Link to={"/authors"}>
        <button>authors</button>
      </Link>
      <Link to={"/books"}>
        <button>books</button>
      </Link>
      <Link to={"/add"}>
        <button>add-book</button>
      </Link>
      <Link to={"/recommended"}>
        <button>recommended</button>
      </Link>
      <button onClick={logOut}>logout</button>
      <Routes>
        <Route
          path="/authors"
          element={<Authors authors={authorsRes.data.authors} />}
        />
        <Route path="/books" element={<Books books={booksRes.data.books} />} />
        <Route path="/add" element={<NewBook />} />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
        <Route
          path="/recommended"
          element={<Recommended user={userRes.data} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
