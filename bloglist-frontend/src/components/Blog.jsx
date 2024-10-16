import Togglable from "./Togglable";
import blogsService from "../services/blogs";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, updateBlogs }) => {
  const updateBlogLikes = async (event) => {
    event.preventDefault();

    // grab current logged in user token
    const loggedBlogappUser = window.localStorage.getItem("loggedBlogappUser");
    const loggedBlogappUserJSON = JSON.parse(loggedBlogappUser);
    const token = loggedBlogappUserJSON.token;
    // post to blogservice with token
    await blogsService.updateBlogLikes(token, blog.id);
    updateBlogs(token);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        url: {blog.url} <br></br>likes: {blog.likes}{" "}
        <button onClick={updateBlogLikes}>like</button>
      </Togglable>
    </div>
  );
};

export default Blog;
