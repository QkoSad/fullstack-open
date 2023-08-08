const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogsRouter.get("", (request, response) => {
  Blog.find({})
    .populate("user", { name: 1 })
    .then((blogs) => {
      response.json(blogs);
    });
});

blogsRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  let result = null;
  const userId = req.user._id.toString();

  if (blog.user.toString() === userId) {
    const newUser = {
      ...req.user._doc,
      blogs: [...req.user._doc.blogs.filter((el) => el.toString() !== id)],
    };
    await User.findOneAndUpdate({ _id: userId }, newUser);
    result = await Blog.findByIdAndDelete(id);
    return res.json(result);
  }
  return res.end();
});

blogsRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findOneAndUpdate({ _id: id }, req.body).then((result) => {
    res.json(result);
  });
});

blogsRouter.post("", middleware.userExtractor, async (req, res) => {
  const { title, url } = req.body;
  const user = req.user;
  const blog = new Blog({
    title,
    author: user.name,
    url,
    likes: 0,
    user: user.id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  user.save();
  res.json(savedBlog);
});

module.exports = blogsRouter;
