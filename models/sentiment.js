"use strict";
module.exports = (sequelize, DataTypes) => {
  const sentiment = sequelize.define(
    "sentiment",
    {
      score: { type: DataTypes.INTEGER, allowNull: false },
      comparativeScore: { type: DataTypes.FLOAT, allowNull: false },
    },
    {}
  );
  sentiment.associate = function (models) {
    sentiment.belongsTo(models.user);
  };
  return sentiment;
};
