const { Router } = require("express");
const router = require("./sentiment");
const User = require("../models/").user;

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});
