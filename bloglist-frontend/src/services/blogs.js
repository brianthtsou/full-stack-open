import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

const getAll = async (token) => {
  console.log("Token being passed: ", token);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createNewBlog = async (token, title, author, url) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    baseUrl,
    {
      title: title,
      author: author,
      url: url,
    },
    config
  );
  return response.data;
};

export default { getAll, createNewBlog };
