let express = require("express");
let Helpers = require("../helpers");

let models = require("../models");

let success = Helpers.success;

let failure = Helpers.failure;

let getPaginationOption = Helpers.getPaginationOption;

let notFound = Helpers.notFoundError;

let user_api_router = express.Router();

/**
 * Get all users
 */
function getUserList(req, res, next) {
  let pageOptions = getPaginationOption(req);
  // pageOptions.include = [];
  models.User.findAndCountAll(pageOptions)
    .then(success(res))
    .catch(failure(req, next));
}

/**
 * Get a particular user
 */
function getUserDetail(req, res, next) {
  models.User.findByPk(req.params.userId)
    .then(user => {
      if (!user) {
        notFound("User");
      }
      success(res)(user);
    })
    .catch(failure(req, next, 404));
}

/**
 * Create a user.
 */
function addUser(req, res, next) {
  let user = req.body;
  console.log("Received data: " + user);
  if (!user) throw "No user!";
  models.User.create(user)
    .then(data => {
      res.status(201);
      success(res)(data);
    })
    .catch(failure(req, next));
}

/**
 * Update a user.
 */
function updateUser(req, res, next) {
  // res.json({error: "update user: Not implemented"});

  return models.User.findByPk(req.params.userId)
    .then(existing_user => {
      return existing_user
        .update({
          firstName: req.body.firstName || existing_user.firstName,
          lastName: req.body.lastName || existing_user.lastName
        })
        .then(() => {
          res.status(202);
          success(res)(existing_user);
        })
        .catch(error => res.status(400).send(error));
    })
    .catch(failure(req, next, 404));
}

/**
 * Delete a user.
 */
function deleteUser(req, res, next) {
  models.User.findByPk(req.params.userId)
    .then(user => {
      if (!user) {
        notFound("User");
      }
      user.destroy();
      res.status(204);
      success(res)();
    })
    .catch(failure(req, next, 404));
}

/**
 * Get all friends of a user.
 */
function getFriends(req, res, next) {
  let pageOptions = getPaginationOption(req);
  models.User.findById(req.params.userId)
    .then(user => {
      return user.getFriends(pageOptions);
    })
    .then(success(res))
    .catch(failure(req, next));
}

/**
 * Add a friend for a user
 */
function addFriend(req, res, next) {
  let friend = req.body;
  if (!friend.id) notFound("Friend");

  models.User.addNewFriend(req.params.userId, friend.id)
    .then(data => {
      res.status(200);
      success(res)(data);
    })
    .catch(failure(req, next));
}

/**
 * Get all friends of all friends of a user.
 * So, if User A has friends B, C and:
 *  B has friends D, E, (excluding ofcourse, the user passed - A)
 *  C has friends F, G, B (excluding ofcourse, the user passed - A)
 * Then this API returns friends B, D, E, F, G
 *
 * Basically, return all second level connections for a user.
 */
function getFriendsOfFriends(req, res, next) {
  return models.User.findById(req.params.userId)
    .then(user => {
      user
        .friendsOfFriends()
        .then(success(res))
        .catch(failure(req, next));
    })
    .catch(failure(req, next));
}

// Map the API views to routes.
user_api_router
  .route("/")
  .get(getUserList)
  .post(addUser);

user_api_router
  .route("/:userId")
  .get(getUserDetail)
  .patch(updateUser)
  .delete(deleteUser);

user_api_router.route("/:userId/friends").get(getFriends);

user_api_router.route("/:userId/friends/add").post(addFriend);

user_api_router.route("/:userId/friends-of-friends").get(getFriendsOfFriends);

module.exports = user_api_router;
