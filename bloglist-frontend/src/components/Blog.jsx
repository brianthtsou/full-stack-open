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
  const loggedBlogappUser = window.localStorage.getItem("loggedBlogappUser");
  const loggedBlogappUserJSON = JSON.parse(loggedBlogappUser);
  const token = loggedBlogappUserJSON.token;

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

  const deleteBlog = async (event) => {
    event.preventDefault();
    confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`);
    // grab current logged in user token
    const loggedBlogappUser = window.localStorage.getItem("loggedBlogappUser");
    const loggedBlogappUserJSON = JSON.parse(loggedBlogappUser);
    const token = loggedBlogappUserJSON.token;

    console.log(loggedBlogappUserJSON);
    console.log("111111");
    console.log(blog);

    await blogsService.deleteBlog(token, blog.id);
    updateBlogs(token);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        url: {blog.url} <br></br>likes: {blog.likes}{" "}
        <button onClick={updateBlogLikes}>like</button>
        {loggedBlogappUserJSON.user_id &&
        blog.user &&
        loggedBlogappUserJSON.user_id === blog.user.id ? (
          <button onClick={deleteBlog}>delete</button>
        ) : null}
      </Togglable>
    </div>
  );
};

export default Blog;
