let friendshipModel = require("./model_friendship");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Friendships", friendshipModel);
};
