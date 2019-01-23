const Sequelize = require("sequelize");

let Friendship = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
};

module.exports = Friendship;
