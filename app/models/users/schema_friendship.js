let friendshipModel = require('./model_friendship'),

module.exports = (sequelize, DataTypes) => {
    let Friendship = sequelize.define('Friendships', friendshipModel);
    return Friendship;
};
