const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sum = blogs.map((b) => b.likes).reduce((a, b) => a + b);
  return sum;
};

const mostLikes = (blogs) => {
  let topBlog = null;
  let topLikes = 0;
  const newArray = blogs.map(({ _id, url, __v, ...keepAttrs }) => keepAttrs);

  for (let blog of newArray) {
    if (blog.likes >= topLikes) {
      topLikes = blog.likes;
      topBlog = blog;
    }
  }
  return topBlog;
};

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
};
