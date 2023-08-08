import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table'

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <Table>
      <tbody>
        <tr>
          <th></th>
          <th>blogs</th>
        </tr>
        <tr key={"top_level"}></tr>
        {users.map((user) => (
          <tr key={user.id}>
            <th>
              <Link to={`/user/${user.id}`}>{user.name}</Link>
            </th>
            <th>{user.blogs.length}</th>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default Users;
