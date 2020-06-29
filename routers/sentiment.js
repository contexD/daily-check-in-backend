const { Router } = require("express");
const User = require("../models/").user;
const Sentiment = require("../models/").sentiment;

const router = new Router();

router.post("/", async (req, res, next) => {
  const { today, tomorrow, life } = req.body;

  console.log("today", today);

  console.log("tomorrow", tomorrow);

  console.log("life", life);

  res.send({ today, tomorrow, life });

  /* VALIDATION */

  //reject if any field is empty

  /* SENTIMENT
  ANALYSIS */

  //analyze today

  //analyze tomorrow

  //analyze life

  //average the scores,comparativScores

  /* SAVE ANALYSIS
  IN DB */

  //req.user.id will contain userId if request is authorized

  //create new sentiment instance in db with respective scores

  /* RESPONSE TO
  CLIENT */

  //send new sentiment instance to client
});

module.exports = router;
