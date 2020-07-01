const { Router } = require("express");
const User = require("../models/").user;

const router = new Router();

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
