const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0);
};
const favoriteBlog = (blogs) => {
  let result = blogs.sort((a, b) => a.score - b.score);
  return result[0].likes;
};

const mostLikes = (blogs) => {
  let authors = new Map();
  blogs.forEach((el) => {
    if (authors.has(el.author))
      authors.set(el.author, authors.get(el.author) + el.likes);
    else authors.set(el.author, el.likes);
  });
  return Math.max(...authors.values())
};
const mostBlogs = (blogs) => {
  let authors = new Map();
  blogs.forEach((el) => {
    if (authors.has(el.author))
      authors.set(el.author, authors.get(el.author) + 1);
    else authors.set(el.author, 1);
  });
  return Math.max(...authors.values())
};
module.exports = { dummy, mostLikes, mostBlogs, totalLikes, favoriteBlog };
