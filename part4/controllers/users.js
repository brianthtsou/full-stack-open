const bcryptjs = require("bcryptjs");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  try {
    const users = await User.find({});
    return response.status(200).json(users);
  } catch (err) {
    return response
      .status(500)
      .json({ message: "An error occurred.", err: err.message });
  }
});

userRouter.get("/:id");

userRouter.post("/", async (request, response) => {
  try {
    const { username, name, password } = request.body;

    console.log(request.body);
    if (!request.body.hasOwnProperty(password) || password.length < 4) {
      console.log("ok");
      return response.status(400).json({
        message: "Error occurred due to invalid password.",
      });
    }

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
    if (
      err.errors &&
      err.errors.username &&
      err.errors.username.kind === "minlength"
    ) {
      return response.status(400).json({
        message: "Validation failed",
        err: err.message,
      });
    }

    return response.status(500).json({
      message: "An error occurred when saving new user.",
      err: err.message,
    });
  }
});

module.exports = userRouter;
