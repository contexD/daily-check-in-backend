const { Router } = require("express");
const Sentiment = require("sentiment");
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

router.get("/users/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      include: [{ model: Sentiment }],
    });
    if (!user) {
      return res.status(404).send({ message: "User and/or data not found" });
    }
    delete user.dataValues["password"];
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
