import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import CreateNewBlogForm from "./components/CreateNewBlogForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    console.log("JSON: ", loggedUserJSON);
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser.username);
      updateBlogs(loggedUser.token);
    }
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const updateBlogs = async (token) => {
    if (token) {
      try {
        console.log("Token being passed: ", token);
        const blogs = await blogService.getAll(token); // Pass token to blogService
        setBlogs(blogs); // Update state only when the blogs are fetched
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    }
  };

  const logoutUser = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h2>log into application</h2>
        <LoginForm updateUser={updateUser} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <div>logged in: {user}</div>
        <button onClick={logoutUser}>logout</button>
      </div>
      <br></br>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <div>
        <h2>create new blog</h2>
        <CreateNewBlogForm updateBlogs={updateBlogs} />
      </div>
    </div>
  );
};

export default App;
