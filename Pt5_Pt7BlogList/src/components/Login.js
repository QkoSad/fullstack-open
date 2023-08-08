import loginService from "../services/login";
import { useState } from "react";
import blogService from "../services/blogs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = ({ setUser }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      setUser(user);
    } catch (err) {}
  };

  return (
    <>
      <div>Log in to application</div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label> username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default Login;
