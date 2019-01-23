function seedFriendships(models) {
  let data = [
    { UserId: 2, FriendId: 12, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 2, FriendId: 3, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 2, FriendId: 4, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 2, FriendId: 11, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 2, FriendId: 6, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 3, FriendId: 2, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 3, FriendId: 5, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 3, FriendId: 4, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 3, FriendId: 11, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 3, FriendId: 7, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 3, FriendId: 8, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 4, FriendId: 2, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 4, FriendId: 7, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 4, FriendId: 10, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 4, FriendId: 5, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 4, FriendId: 6, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 5, FriendId: 2, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 5, FriendId: 3, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 5, FriendId: 10, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 5, FriendId: 11, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 5, FriendId: 9, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 6, FriendId: 2, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 7, FriendId: 10, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 8, FriendId: 5, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 9, FriendId: 4, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 10, FriendId: 2, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 11, FriendId: 3, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 11, FriendId: 4, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 11, FriendId: 5, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 11, FriendId: 6, createdAt: new Date(), updatedAt: new Date() },
    { UserId: 12, FriendId: 3, createdAt: new Date(), updatedAt: new Date() }
  ];

  return models.Friendship.bulkCreate(data)
        .catch(e => console.log(e));

}

module.exports = seedFriendships;