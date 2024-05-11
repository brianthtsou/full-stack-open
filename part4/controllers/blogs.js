const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    response
      .status(400)
      .send({ message: "Missing title and/or url in request body." });
    return;
  }

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogRouter;
