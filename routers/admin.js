const { Router } = require("express");
// const Sentiment = require("sentiment");
const User = require("../models/").user;
const Sentiment = require("../models").sentiment;

const router = new Router();

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll({ include: [{ model: Sentiment }] });
    const usersAndScore = users.map((user) => {
      const score =
        user.dataValues.sentiments.reduce((total, currentValue) => {
          return total + currentValue.score;
        }, 0) / user.dataValues.sentiments.length;
      delete user.dataValues["sentiments"];
      delete user.dataValues["password"];
      return { user, score };
    });
    return res.status(200).send(usersAndScore);
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
