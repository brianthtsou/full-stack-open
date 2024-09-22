const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }
//   return null;
// };

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  return response.status(200).json(blogs);
});

blogRouter.post("/", async (request, response) => {
  // create a new blog
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    response
      .status(400)
      .json({ message: "Missing title and/or url in request body." });
    return;
  }

  // check to see if token exists
  if (!request.token) {
    return response.status(401).json({ message: "Token missing" });
  }

  // verify token
  let decodedToken;
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  } catch (err) {
    return response.status(401).json({
      err: err.message,
      message: "Invalid or missing token verification",
    });
  }

  if (!decodedToken.user_id) {
    return response.status(401).json({ err: "token invalid" });
  }
  try {
    // fetch user by id from decoded token
    const user = await User.findById(decodedToken.user_id);
    if (!user) {
      return response.status(404).json({ message: "user not found" });
    }

    // indicate blog as being owned by user
    blog.user = user._id;

    // save blog, append blog to user's list of blogs
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);

    await user.save();
    return response.status(201).json(savedBlog);
  } catch (err) {
    // database errors
    return response
      .status(500)
      .json({ message: "Internal server error", err: err.message });
  }
});

blogRouter.delete("/:id", async (request, response) => {
  // check to see if token exists
  if (!request.token) {
    return response.status(401).json({ message: "Token missing" });
  }

  // verify token
  let decodedToken;
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  } catch (err) {
    return response.status(401).json({
      err: err.message,
      message: "Invalid or missing token verification",
    });
  }

  if (!decodedToken.user_id) {
    return response.status(401).json({ err: "token invalid" });
  }

  try {
    const result = await Blog.findById(request.params.id);
    if (!result) {
      return response.status(404).json({ message: "No blog found." });
    }
    if (result.user.equals(decodedToken.user_id)) {
      return (
        response.status(401),
        json({
          err: err.message,
          message: "Invalid user logged in.",
        })
      );
    }
    const deletedResult = await Blog.findByIdAndDelete(request.params.id);
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
