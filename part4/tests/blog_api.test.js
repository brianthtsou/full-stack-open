const { test, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("assert");
const app = require("../app");

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("unique identifier property of blog posts are named id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  console.log(blogs);

  const allHaveId = blogs.every((blog) => blog.hasOwnProperty("id"));
  assert.strictEqual(allHaveId, true);
  const allHave_Id = blogs.every((blog) => blog.hasOwnProperty("_id"));
  assert.strictEqual(allHave_Id, false);
});

after(async () => {
  await mongoose.connection.close();
});
