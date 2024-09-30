import { Link } from "react-router-dom";
import { setAllBlogs } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import userService from "../services/user";
import { setAllUsers } from "../reducers/userReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Navigation = ({ user, setUser }) => {
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [setUser]);
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        dispatch(setAllBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      );
  }, [dispatch]);
  useEffect(() => {
    const getData = async () => {
      const users = await userService.getAll();
      dispatch(setAllUsers(users));
    };
    getData();
  }, [dispatch]);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Nav className="me-auto">
          <Nav.Link as="span">
            <Link to={"/users"}>users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to={"/"}>blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user ? `logged in as ${user.name}` : ""}
          </Nav.Link>
          <button onClick={logOut}>logout</button>
          <h2>blog app</h2>
        </Nav>
    </Navbar>
  );
};
export default Navigation;
