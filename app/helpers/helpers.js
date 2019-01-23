let fs = require("fs");

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
  offset = (page - 1) * pageSize;

  return {
    offset: offset,
    limit: pageSize
  };
}

module.exports = {
  failure: failure,
  success: success,
  require: reqDir,
  notFoundError: notFoundError,
  getPaginationOption: getPaginationOption
};
