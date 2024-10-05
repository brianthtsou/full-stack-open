import { useState } from "react";
import blogsService from "../services/blogs";

const CreateNewBlogForm = ({ updateBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();

    // grab current logged in user token
    const loggedBlogappUser = window.localStorage.getItem("loggedBlogappUser");
    const loggedBlogappUserJSON = JSON.parse(loggedBlogappUser);
    const token = loggedBlogappUserJSON.token;

    // post to blogservice with token
    await blogsService.createNewBlog(token, title, author, url);
    updateBlogs(token);
  };

  return (
    <form onSubmit={handleCreateNewBlog}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          value={author}
          name="Password"
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        ></input>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateNewBlogForm;
