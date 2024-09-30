import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";
import Togglable from "./Togglable";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <>
      <Togglable buttonLabel1="create blog">
        <BlogForm blogs={blogs} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Link key={blog.id} to={`/blog/${blog.id}`}>{blog.title}</Link>
        ))}
      </div>
    </>
  );
};

export default Blogs;
