import { useState } from "react";
import PropTypes from "prop-types";
import blogsService from "../services/blogs";

const CreateNewBlogForm = ({ updateBlogs, updateBlogNotification }) => {
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
    updateBlogNotification({ blogTitle: title, blogAuthor: author });
  };

  return (
    <form onSubmit={handleCreateNewBlog}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={title}
          name="Title"
          id="title-input"
          onChange={({ target }) => setTitle(target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          value={author}
          name="author"
          id="author-input"
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          value={url}
          name="url"
          id="url-input"
          onChange={({ target }) => setUrl(target.value)}
        ></input>
      </div>
      <button id="create-blog-submit-button" type="submit">
        Create
      </button>
    </form>
  );
};

CreateNewBlogForm.propTypes = {
  updateBlogs: PropTypes.func.isRequired,
  updateBlogNotification: PropTypes.func.isRequired,
};

export default CreateNewBlogForm;
