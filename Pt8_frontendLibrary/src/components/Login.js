import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const Login = ({ token, setToken }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN);
  const loginUser = async (e) => {
    e.preventDefault();
    await login({ variables: { username: name, password } });
  };
  useEffect(() => {
    if (result.data) {
      setToken(result.data.login.value);
      localStorage.setItem("library-user-token", result.data.login.value);
    }
  }, [result.data]);
  return (
    <form onSubmit={loginUser}>
      name <input onChange={(e) => setName(e.target.value)} value={name} />
      password{" "}
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button>login</button>
    </form>
  );
};
export default Login;
