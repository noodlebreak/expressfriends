let userModel = require("./model_user");
let userServiceMethods = require("./_user_service_methods");

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define("User", userModel);

  User.associate = function(models) {
    User.belongsToMany(models.User, {
      as: "Friends",
      through: "Friendship"
    });
  };

  userServiceMethods(User);
  return User;
};
