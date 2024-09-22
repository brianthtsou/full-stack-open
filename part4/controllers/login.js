const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      return response
        .status(400)
        .json({ error: "username or password missing" });
    }

    const user = await User.findOne({ username: username });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(passwordCorrect && user)) {
      return response
        .status(401)
        .json({ error: "invalid username or password" });
    }

    const userForToken = { user: user.username, id: user._id };

    const token = jwt.sign(userForToken, process.env.SECRET);

    return response.status(200).json({
      token: `Bearer ${token}`,
      username: user.username,
      name: user.name,
      user_id: user._id,
    });
  } catch (err) {
    return response.status(400).json({
      err: err.message,
      message: "encountered error while logging in",
    });
  }
});

module.exports = loginRouter;
