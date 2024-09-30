import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser.username);
    }
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const logoutUser = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
    </div>
  );
};

export default App;
