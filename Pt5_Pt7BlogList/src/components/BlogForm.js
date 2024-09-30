import { useState } from "react";
import { useDispatch} from "react-redux";
import blogService from "../services/blogs";
import {
  createNotification,
  removeNotification,
} from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const BlogFrom = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const createNewBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const blog = await blogService.create({ title, url });
      dispatch(createBlog(blog));
      setTitle("");
      setUrl("");
      dispatch(createNotification("new blog created"));

      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={createNewBlogSubmit}>
        <h2>create new</h2>
        <div>
          title
          <input
            name="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          url
          <input
            name="Url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};
export default BlogFrom;
