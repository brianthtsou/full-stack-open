const bcryptjs = require("bcryptjs");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  try {
    const users = await User.find({});
    return response.status(200).json(users);
  } catch (err) {
    return response.status(500).json({ message: "An error occurred." });
  }
});

userRouter.get("/:id");

userRouter.post("/", async (request, response) => {
  try {
    const { username, name, password } = request.body;

    const saltRounds = 10;
    const passwordHash = await bcryptjs.hash(password, saltRounds);

    const user = new User({
      username: username,
      name: name,
      passwordHash: passwordHash,
    });

    const savedUser = await user.save();
    return response.status(201).json(savedUser);
  } catch (err) {
    return response
      .status(500)
      .json({ message: "An error occurred when saving new user." });
  }
});

module.exports = userRouter;
