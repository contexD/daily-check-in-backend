"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "sentiments",
      [
        {
          score: 4,
          comparativeScore: 2.1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          score: 1,
          comparativeScore: 3.2,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("sentiments", null, {});
  },
};
