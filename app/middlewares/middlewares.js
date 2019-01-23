let logger = require("morgan"),
  cookieParser = require("cookie-parser"),
  express = require("express"),
helmet = require("helmet");

module.exports.init = function(app) {
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(logger("dev"));
  app.use(cookieParser());
};
