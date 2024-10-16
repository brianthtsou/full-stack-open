import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import CreateNewBlogForm from "./components/CreateNewBlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

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

  const updateBlogNotification = ({ blogTitle, blogAuthor }) => {
    setMessage(`${blogTitle} by ${blogAuthor} added!`);
    setIsError(false);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const updateLoginNotification = () => {
    setMessage("Login failed! Please try again.");
    setIsError(true);
    setTimeout(() => {
      setMessage(null);
      setIsError(false);
    }, 5000);
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
        <Notification message={message} isError={isError} />
        <LoginForm
          updateUser={updateUser}
          updateLoginNotification={updateLoginNotification}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} isError={isError} />
      <div>
        <div>logged in: {user}</div>
        <button onClick={logoutUser}>logout</button>
      </div>
      <br></br>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs} />
      ))}
      <div>
        <h2>create new blog</h2>
        <Togglable buttonLabel="new blog">
          <CreateNewBlogForm
            updateBlogs={updateBlogs}
            updateBlogNotification={updateBlogNotification}
          />
        </Togglable>
      </div>
    </div>
  );
};

export default App;
