let notFoundError = require("../../helpers").notFoundError;

/**
 * Add User service methods, to help facilitate easy access to functionality on a User.
 */

/**
 * Add a friend to a user.
 */
function makeFriend(userId, friendId) {
  return this.findByPk(userId).then(user => {
    if (!user) {
      notFoundError("User");
    }
    this.findByPk(friendId).then(friend => {
      if (!friend) {
        notFoundError("User");
      }
      // NOTE: creating two relationship here
      // So that reverse lookup from a "friend"
      // gets the current user as a friend in their friends list too.
      // Basically for easier lookup in the getFriends route.
      user.addFriend(friend);
      friend.addFriend(user);
    });
  });
}

/**
 * Get friends of friends of a user
 */
function friendsOfFriends() {
  return this.sequelize
    .query(
      'SELECT "Users".*, f_fof."UserId" from "Users",' +
        ' (SELECT f."UserId", f."FriendId" FROM "Friendship" f WHERE "UserId" = ' +
        this.id +
        " UNION" +
        '  SELECT f."UserId", fof."FriendId" FROM "Friendship" f, "Friendship" fof' +
        '  WHERE  f."UserId" = ' +
        this.id +
        '  AND   f."FriendId" = fof."UserId" )' +
        '  as f_fof WHERE "Users".id = f_fof."FriendId"',
      { type: this.sequelize.QueryTypes.SELECT }
    )
    .then(function(res) {
      return res;
    });
}

function addMethods(schema) {
  schema.prototype.friendsOfFriends = friendsOfFriends;
  schema.makeFriend = makeFriend;
}

module.exports = addMethods;
