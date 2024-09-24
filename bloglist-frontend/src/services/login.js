import axios from "axios";
const baseUrl = "http://localhost:3001/api/login";

const initiateLogin = async (username, password) => {
  const request = await axios.post(baseUrl, {
    username: username,
    password: password,
  });
  return request.data;
};

export default { initiateLogin };
