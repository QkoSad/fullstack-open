import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { likeBlog, addComment } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Blog = () => {
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((e) => e.id === id);
  const dispatch = useDispatch();
  const increseLikes = async () => {
    const blogResp = await blogService.changeBlog(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    });

    dispatch(likeBlog(blogResp));
  };
  const [comment, setComment] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const blogResp = await blogService.changeBlog(blog.id, {
      ...blog,
      comments: blog.comments.concat(comment),
      user: blog.user.id,
    })
    dispatch(addComment({ id: blogResp.id, comment }));
    setComment("");
  };
  return (
    <>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button onClick={increseLikes}>Like</button>
      </div>
      <div>Added by {blog.author}</div>
      <h3>comments </h3>
      <form onSubmit={onSubmit}>
        <input onChange={(e) => setComment(e.target.value)} value={comment} />
        <button>add commnet</button>
      </form>
      {blog.comments?.length ? (
        <ul>
          {blog.comments?.map((el, indx) => {
            return <li key={indx}>{el}</li>;
          })}
        </ul>
      ) : null}
    </>
  );
};
export default Blog;
