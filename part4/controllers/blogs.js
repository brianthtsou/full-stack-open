const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  return response.status(200).json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const user = await User.findOne();
  const token = Login;

  blog.user = user._id;

  if (!blog.title || !blog.url) {
    response
      .status(400)
      .json({ message: "Missing title and/or url in request body." });
    return;
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();
  return response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  try {
    const result = await Blog.findByIdAndDelete(request.params.id);
    if (!result) {
      return response.status(404).json({ message: "No blog found." });
    }
    return response.status(200).json({ message: "Blog deleted successfully." });
  } catch (err) {
    return response
      .status(500)
      .json({ message: "An error occurred.", err: err.message });
  }
});

blogRouter.put("/:id", async (request, response) => {
  try {
    const body = request.body;
    const updatedBlog = { ...request.body, likes: request.body.likes + 1 };

    const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog);
    if (!result) {
      return response.status(404).json({ message: "No blog found." });
    }
    return response.status(200).json({ message: "Blog updated successfully." });
  } catch (err) {
    return response
      .status(500)
      .json({ message: "An error occurred.", err: err.message });
  }
});

module.exports = blogRouter;
