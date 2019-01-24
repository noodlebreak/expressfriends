let fs = require("fs");
let pgtools = require("pgtools");

// requires all files/modules in a directory
function reqDir(dir) {
  // Grab the name of the directory to not include it's main file
  let dirName = dir.split("/");
  dirName = dirName[dirName.length - 1] + ".js";
  let reqObj = {};
  let files = fs.readdirSync(dir);
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    // Don't include the index or directory's main file
    if (file !== dirName && file !== "index.js")
      reqObj[file] = require(dir + "/" + file);
  }
  return reqObj;
}

function success(res, message) {
  return function(data) {
    let response = {};
    if (message)
      response = {
        message: message,
        data: data
      };
    else response = data;
    return res.json(response);
  };
}

function failure(req, next, status) {
  return function(err) {
    if (err.statusCode) req.appStatus = err.statusCode;
    else req.appStatus = status;
    next(err);
  };
}

function notFoundError(model) {
  let e = new Error("Could not find " + model);
  e.statusCode = 404;
  throw e;
}

function getPaginationOption(req) {
  let pageSize = +req.query.count || process.env.DEFAULT_PAGE_SIZE,
    page = +req.query.page || 0;

  if (pageSize > 1000) pageSize = 100;
  if (page <= 0) page = 1;

  // account for offset and count
  let offset = (page - 1) * pageSize;

  return {
    offset: offset,
    limit: pageSize
  };
}

function createDatabase(db_name, callback) {
  return pgtools.createdb(
    {
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      host: process.env.DB_HOST
    },
    db_name,
    function(err, res) {
      let can_call = false;
      if (err) {
        if (err.message.includes("Attempted to create a duplicate database.")) {
          console.error("Skipping DB creation: already exists");
          can_call = true;
        }
      }
      else {
        can_call = true;
        console.log("createDatabase result: " + res);
      }
      if (can_call){
        callback();
      }
    }
  );
}

module.exports = {
  failure,
  success,
  notFoundError,
  getPaginationOption,
  createDatabase,
  require: reqDir
};
