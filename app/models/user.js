"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING
		},
		{}
	);

	const Friendship = sequelize.define("Friendships", {
		id: {
			type: "Sequelize.INTEGER",
			primaryKey: true,
			autoIncrement: true
		}
	});

	User.associate = function(models) {
		// associations can be defined here
		User.belongsToMany(models.User, {
			as: "Friends",
			through: "Friendship"
			// foreignKey: 'userId',
			// otherKey: 'friendId'
		});
	};

	User.addNewFriend = function(userId, friendId) {
		return this.findByPk(userId).then(user => {
			if (!user) notFoundError("User");
			this.findByPk(friendId).then(friend => {
				if (!friend) notFoundError("User");
				user.addFriends(friend);
				friend.addFriends(user);
			});
		});
	};


	User.prototype.friendsOfFriends = function() {
	    return this.sequelize.query('SELECT "Users".*, f_fof."UserId" from "Users",' +
	        ' (SELECT f."UserId", f."FriendId" FROM "Friendship" f WHERE "UserId" = ' + this.id + ' UNION' +
	        '  SELECT f."UserId", fof."FriendId" FROM "Friendship" f, "Friendship" fof' +
	        '  WHERE  f."UserId" = ' + this.id + '  AND   f."FriendId" = fof."UserId" )' +
	        '  as f_fof WHERE "Users".id = f_fof."FriendId"',
	        {type: this.sequelize.QueryTypes.SELECT}).then(function (res) {
	        return res;
	    })
	};


	return User;
};
