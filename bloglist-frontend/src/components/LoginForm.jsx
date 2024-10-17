import { useState } from "react";
import loginService from "../services/login";
import PropTypes from "prop-types";

const LoginForm = ({ updateUser, updateLoginNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      // get login token & userdata
      const result = await loginService.initiateLogin(username, password);
      console.log(result);
      // if token & username valid, changed loggedin user
      if (result.token && result.username) {
        updateUser(result.username);
        window.localStorage.setItem(
          "loggedBlogappUser",
          JSON.stringify(result)
        );
      } else {
        updateLoginNotification();
      }
    } catch (error) {
      updateLoginNotification();
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  updateUser: PropTypes.func.isRequired,
  updateLoginNotification: PropTypes.func.isRequired,
};

export default LoginForm;
