const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("assert");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Test Blog",
    author: "Tester",
    url: "Test Url",
    likes: 1,
  },
  {
    title: "Test Blog2",
    author: "Tester2",
    url: "Test Url2",
    likes: 2,
  },
  {
    title: "Test Blog Missing Likes",
    author: "Tester3",
    url: "Test Url3",
  },
];

test.only("simple test", async () => {
  console.log("This is a test");
  assert.strictEqual(1, 1);
});

describe("basic functions and formatting", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("unique identifier property of blog posts are named id", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;

    const allHaveId = blogs.every((blog) => blog.hasOwnProperty("id"));
    assert.strictEqual(allHaveId, true);
    const allHave_Id = blogs.every((blog) => blog.hasOwnProperty("_id"));
    assert.strictEqual(allHave_Id, false);
  });

  test("post request successfully creates new blog post", async () => {
    const postResponse = await api
      .post("/api/blogs")
      .send(initialBlogs[1])
      .expect(201);

    const getResponse = await api.get("/api/blogs").expect(200);
    const blogs = getResponse.body;
    assert(blogs.length === 2);
  });

  test("post request of blog that is missing 'likes' defaults to 0", async () => {
    console.log(initialBlogs[2]);
    const postResponse = await api
      .post("/api/blogs")
      .send(initialBlogs[2])
      .expect(201);

    const getResponse = await api.get("/api/blogs").expect(200);
    const blogs = getResponse.body;
    console.log(blogs);
    assert.strictEqual(
      blogs.find((blog) => blog.author === "Tester3").likes,
      0
    );
  });
});

after(async () => {
  await mongoose.connection.close();
});
