const { Router, request } = require("express");
const User = require("../models/").user;
const Sentiment = require("../models/").sentiment;
const SentimentTool = require("sentiment");
const sentiment = new SentimentTool();

const router = new Router();

router.post("/", async (req, res, next) => {
  try {
    const { today, tomorrow, life } = req.body;

    /* VALIDATION */

    //reject if any field is empty

    /* SENTIMENT
  ANALYSIS */

    //analyze today
    const resultToday = sentiment.analyze(today);
    //analyze tomorrow
    const resultTomorrow = sentiment.analyze(tomorrow);
    //analyze life
    const resultLife = sentiment.analyze(life);
    //average the scores,comparativScores
    const averageScore =
      (resultToday.score + resultTomorrow.score + resultLife.score) / 3;
    const averageComparativeScore =
      (resultToday.comparative +
        resultTomorrow.comparative +
        resultLife.comparative) /
      3;
    /* SAVE ANALYSIS
  IN DB */
    // req.user.id will contain userId if request is authorized
    // create new sentiment instance in db with respective scores

    let result = await Sentiment.create({
      score: averageScore,
      comparativeScore: averageComparativeScore,
      userId: req.user.id,
    });

    /* RESPONSE TO
  CLIENT */
    //send new sentiment instance to client

    return res.status(204).send({ ...result.dataValues });
    //res.send({ averageScore });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
