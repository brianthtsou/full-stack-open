import Togglable from "./Togglable";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <Togglable buttonLabel="view">
      url: {blog.url} <br></br>likes: {blog.likes} <button>like</button>
    </Togglable>
  </div>
);

export default Blog;
