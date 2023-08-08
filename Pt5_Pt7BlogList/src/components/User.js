import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const User = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const user = users.find((el) => el.id === id);
  const blogs = useSelector((state) => state.blogs);
  const userBlogs = blogs.filter(el=> el.user.id === user.id)

  useEffect(() => {});
  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map((blog, index) => (
          <li key={index}>
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default User;
