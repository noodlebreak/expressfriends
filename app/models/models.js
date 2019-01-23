"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};
require("dotenv").config({
  path: __dirname + "/.env"
});

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return file.slice(-3) !== ".js";
  })
  .filter(modelDir => {
    fs.readdirSync(path.join(__dirname, modelDir))
      .filter(file => {
        return file.startsWith("schema_");
      })
      .forEach(file => {
        let model = sequelize["import"](path.join(__dirname, modelDir, file));
        db[model.name] = model;
        return file;
      });
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
