import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const blogReducer = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setAllBlogs: (state, action) => action.payload,
    createBlog: (state, action) => {
      state.push(action.payload);
    },
    removeBlog: (state, action) =>
      state.filter((el) => el.id !== action.payload.id),
    likeBlog: (state, action) => {
      const blog = state.find((el) => el.id === action.payload.id);
      const newblog = { ...blog, likes: blog.likes + 1 };
      state[state.indexOf(blog)] = newblog;
    },
    addComment: (state, action) => {
      const blog = state.find((el) => el.id === action.payload.id);
      console.log(action.payload);
      const newblog = {
        ...blog,
        comments: [...blog.comments, action.payload.comment],
      };
      state[state.indexOf(blog)] = newblog;
    },
  },
});

export default blogReducer.reducer;
export const { addComment, setAllBlogs, createBlog, removeBlog, likeBlog } =
  blogReducer.actions;
