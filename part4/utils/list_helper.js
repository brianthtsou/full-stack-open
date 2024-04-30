const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sum = blogs.map((b) => b.likes).reduce((a, b) => a + b);
  return sum;
};

module.exports = {
  dummy,
  totalLikes,
};
